@echo off
cls 
IF exist server/node_modules (
	cd server && npm start
) ELSE (
	echo Installing Backend Modules
	cd server && npm install
)