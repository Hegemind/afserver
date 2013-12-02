BEGIN TRANSACTION;

-- *******************************************************************************
-- GAME SYSTEM

DROP TABLE game_system;
CREATE TABLE game_system (
	id		INT			NOT NULL ,
	name	VARCHAR(60)	NOT NULL ,
	version	VARCHAR(30)	NULL,
						  
	PRIMARY KEY (id) );

INSERT INTO game_system VALUES(1, "d20", "version 1");
INSERT INTO game_system VALUES(2, "Storyteller", "2007");
INSERT INTO game_system VALUES(3, "GURPS", "7th edition");

-- *******************************************************************************
-- GAME

DROP TABLE game;
CREATE TABLE game (
	id				INT			NOT NULL ,
	name			VARCHAR(32)	NOT NULL ,
	version			VARCHAR(30)	NULL,
	game_system_id	INT			NOT NULL ,
	
	PRIMARY KEY (id) ,
	FOREIGN KEY (game_system_id) REFERENCES game_system (id) ON DELETE NO ACTION ON UPDATE NO ACTION);


INSERT INTO game VALUES(1, "DnD", 1, "4th Edition");

-- *******************************************************************************
-- ATTRIBUTE TYPES

DROP TABLE attribute_type;
CREATE TABLE attribute_type (
	id 					INT NOT NULL ,
	name				VARCHAR(50) NOT NULL,
	abreviation			VARCHAR(10) NULL,
	description			VARCHAR(200) NULL ,
	short_description	VARCHAR(60) NULL ,
	min_value			INT NULL ,
	max_value			INT NULL ,
	game_id				INT NOT NULL ,
	PRIMARY KEY (id),
	FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION ON UPDATE NO ACTION);

INSERT INTO attribute_type VALUES(1, "Strength", "STR", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(2, "Dexterity", "DEX", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(3, "Constitution", "CON", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(4, "Intelligence", "INT", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(5, "Wisdom", "WIS", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(6, "Charisma", "CHA", "long description", "short description", 0, 100, 1);

-- *******************************************************************************
-- USERS

DROP TABLE user;
CREATE TABLE user (
	id 			INT NOT NULL ,
	username	VARCHAR(50) NOT NULL UNIQUE,
	password	VARCHAR(10) NULL,
	PRIMARY KEY (id));

INSERT INTO user VALUES(1, "leandro", "123");
INSERT INTO user VALUES(2, "marijose", "123");
INSERT INTO user VALUES(3, "esteban", "123");
INSERT INTO user VALUES(4, "natalia", "123");

-- *******************************************************************************
-- RACES

DROP TABLE IF EXISTS race;
CREATE  TABLE IF NOT EXISTS race (
  id	INT NOT NULL ,
  name	VARCHAR(64) NOT NULL ,
  PRIMARY KEY (id));

INSERT INTO race VALUES(1, "human");
INSERT INTO race VALUES(2, "elf");
INSERT INTO race VALUES(3, "orc");

-- *******************************************************************************
-- CHARACTER CLASSES

DROP TABLE IF EXISTS class;
CREATE  TABLE IF NOT EXISTS class (
	id		INT NOT NULL ,
	name	VARCHAR(64) NOT NULL ,
	PRIMARY KEY (id) );

INSERT INTO class VALUES(1, "class1");
INSERT INTO class VALUES(2, "class2");
INSERT INTO class VALUES(3, "class3");

-- *******************************************************************************
-- CHARACTERS

DROP TABLE IF EXISTS character ;
CREATE  TABLE IF NOT EXISTS character (
	id			INT NOT NULL ,
	name		VARCHAR(32) NOT NULL ,
	age			INT NULL ,
	is_npc		TINYINT(1) NULL ,
	level		INT NULL ,
	deity		VARCHAR(45) NULL ,
	height		INT NULL ,
	weight		INT NULL ,
	gender		VARCHAR(45) NULL ,
	description	VARCHAR(200) NULL ,
	player_id	INT NOT NULL ,
	race_id		INT NOT NULL ,
	class_id	INT NOT NULL ,
	PRIMARY KEY (id) ,
	FOREIGN KEY (player_id )
		REFERENCES user (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	FOREIGN KEY (race_id )
		REFERENCES race (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	FOREIGN KEY (class_id )
		REFERENCES class (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION);

INSERT INTO character VALUES(1, "Oreganal", 334, 0, 30, "my deity", "180", "300", "Female", "description", 2, 2, 3);
INSERT INTO character VALUES(2, "Olajuwon", 45, 1, 35, "basket", "220", "270", "Male", null, 2, 1, 1);

-- *******************************************************************************
-- ATTRIBUTES

DROP TABLE IF EXISTS attribute ;
CREATE  TABLE IF NOT EXISTS attribute (
	id					INT NOT NULL ,
	current_value		INT NOT NULL ,
	attribute_type_id	INT NOT NULL ,
	character_id		INT NOT NULL ,
	PRIMARY KEY (id) ,
	FOREIGN KEY (attribute_type_id )
		REFERENCES attribute_type (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	FOREIGN KEY (character_id )
		REFERENCES character (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION);

INSERT INTO attribute VALUES(1, 10, 1, 1);
INSERT INTO attribute VALUES(2, 10, 2, 1);
INSERT INTO attribute VALUES(3, 10, 3, 1);
INSERT INTO attribute VALUES(4, 10, 4, 1);
INSERT INTO attribute VALUES(5, 10, 5, 1);
INSERT INTO attribute VALUES(6, 10, 6, 1);
INSERT INTO attribute VALUES(7, 10, 1, 2);
INSERT INTO attribute VALUES(8, 10, 2, 2);
INSERT INTO attribute VALUES(9, 10, 3, 2);
INSERT INTO attribute VALUES(10, 10, 4, 2);
INSERT INTO attribute VALUES(11, 10, 5, 2);
INSERT INTO attribute VALUES(12, 10, 6, 2);

COMMIT;
/* Display all the records from the table */
SELECT * FROM attribute;