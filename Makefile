run-docker:
	docker build -t budatest:latest .
	docker run -it -p 8080:8080 budatest:latest
