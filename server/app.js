import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import chalk from 'chalk';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { whitelist, limiter } from './middlewares/security.js';
import { swaggerDocs, swaggerUi } from './utils/api-docs.js';

import authRoutes from './routes/auth.routes.js';
import gigRoutes from './routes/gig.routes.js';
import bidRoutes from './routes/bid.routes.js';

export class GigFlowServer {
	app = express();
	httpServer = createServer(this.app);
	io;
	swaggerSpec = swaggerDocs;

	constructor() {
		this.initializeSocketIo();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	initializeSocketIo() {
		this.io = new Server(this.httpServer, {
			cors: {
				origin: whitelist,
				credentials: true,
			},
		});

		this.io.on('connection', (socket) => {
			console.log(chalk.yellow(`⚡ Socket Connected: ${socket.id}`));
			
			// Auto-join user to their room based on auth
			const userId = socket.handshake.auth.userId;
			if (userId) {
				socket.join(userId);
				console.log(chalk.green(`👤 User ${userId} joined their room`));
			}

			socket.on('disconnect', () => {
				console.log(chalk.yellow(`⚡ Socket Disconnected: ${socket.id}`));
			});
		});

		this.app.set('io', this.io);
	}

	initializeMiddlewares() {
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(limiter);
		this.app.use(express.json({ limit: '120mb' }));
		this.app.use(
			cors({
				origin: whitelist,
				credentials: true,
			})
		);
		this.app.use(express.urlencoded({ extended: true, limit: '120mb' }));
		this.app.use(cookieParser());
		this.app.use(express.static('public'));
	}

	initializeRoutes() {
		// Routes
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/gigs', gigRoutes);
		this.app.use('/api/bids', bidRoutes);

		// Home & HealthCheck Route
		this.app.get('/', (req, res) => {
			res.json({
				success: true,
				message: 'Welcome to GigFlow Backend 🚀',
			});
		});

		this.app.get('/health-check', (req, res) => {
			res.json({
				succcess: true,
				message: 'This Backend Microservice is healthy 🥳',
			});
		});
	}

	initializeErrorHandling() {
		this.app.use((err, req, res, next) => {
			console.error(chalk.red(err.stack));
			res.status(500).json({
				success: false,
				message: err.message || 'Internal Server Error',
			});
		});
	}

	swaggerDocs(app) {
		app.use('/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
		app.get('/docs.json', (req, res) => {
			res.setHeader('Content-Type', 'application/json');
			res.send(this.swaggerSpec);
		});
		console.log(`📄 API Docs available at: ${process.env.DOMAIN_NAME}/docs`);
	}

	async start() {
		const port = process.env.PORT || 3000;
		try {
			// Connect to MongoDB
			await mongoose.connect(process.env.MONGO_URI);
			console.log(chalk.green.bold('🍃 Connected to MongoDB Successfully!'));

			this.httpServer.listen(port, () => {
				console.log(chalk.blue.bold(`🚀 Server running at ${process.env.DOMAIN_NAME}`));
				this.swaggerDocs(this.app);
			});
		} catch (err) {
			console.error(chalk.red('❌ Error starting server:', err));
			process.exit(1);
		}
	}
}
