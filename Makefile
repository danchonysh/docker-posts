mongo:
	docker run -d --rm \
	-p 27017:27017 \
	--name mongodb \
	--network posts-net \
	mongo

api:
	docker run -d --rm \
	-p 3000:3000 \
	--name posts-api \
	--network posts-net \
	posts-api

ui:
	docker run -d --rm \
	-p 5000:8080 \
	--name posts-ui \
	posts-ui