mongo:
	docker run -d --rm \
	-p 27017:27017 \
	--name mongodb \
	--network posts-net \
	-v posts-data:/data/db \
	--env-file ./config/dev.env \
	mongo

api:
	docker run -d --rm \
	-p 3000:3000 \
	--name posts-api \
	--network posts-net \
	--env-file ./config/dev.env \
	-v /home/daniel/Learning/docker-posts/services/api:/app \
	-v /app/node_modules \
	posts-api

ui:
	docker run -d --rm \
	-p 5000:8080 \
	--name posts-ui \
	--env-file ./config/dev.env \
	-v /home/daniel/Learning/docker-posts/services/ui/src:/app/src \
	-v /app/node_modules \
	posts-ui