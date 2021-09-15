create TABLE post(
	id SERIAL PRIMARY KEY,
	caption VARCHAR(255),
	image VARCHAR(255),
	date DATE
);

create TABLE news(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	article VARCHAR(255),
	date DATE
);