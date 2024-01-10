DROP DATABASE IF EXISTS ClearHorizons;
CREATE DATABASE ClearHorizons;
USE ClearHorizons;


CREATE TABLE Users (
	uID int auto_increment primary key,
    firebaseID varchar(255),
    stripeID varchar(255),
    username varchar(255),
    email varchar(255)
);

CREATE TABLE Buildings(
	hID int auto_increment primary key,
    uID int,
    floors int,
    longitude double,
    latitude double,
	address VARCHAR(512),
	standardWindows int,
	frenchWindows int,
	standardHighWindows int,
	frenchHighWindows int,
	wellWindows int,
	screens int,
	FOREIGN KEY (uID) REFERENCES Users(uID)
);
select * from Buildings;