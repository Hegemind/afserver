BEGIN TRANSACTION;

-- *******************************************************************************
-- GAME SYSTEM

DROP TABLE game_system;
CREATE TABLE game_system (
	id		INTEGER PRIMARY KEY AUTOINCREMENT,
	name	VARCHAR(60)	NOT NULL ,
	version	VARCHAR(30)	NULL);

INSERT INTO game_system VALUES(1, "d20", "version 1");
INSERT INTO game_system VALUES(2, "Storyteller", "2007");
INSERT INTO game_system VALUES(3, "GURPS", "7th edition");

-- *******************************************************************************
-- GAME

DROP TABLE game;
CREATE TABLE game (
	id				INTEGER PRIMARY KEY AUTOINCREMENT,
	name			VARCHAR(32)	NOT NULL ,
	version			VARCHAR(30)	NULL,
	game_system_id	INT			NOT NULL ,
	FOREIGN KEY (game_system_id) REFERENCES game_system (id) ON DELETE NO ACTION ON UPDATE NO ACTION);


INSERT INTO game VALUES(1, "DnD", 1, "4th Edition");

-- *******************************************************************************
-- ATTRIBUTE TYPES

DROP TABLE attribute_type;
CREATE TABLE attribute_type (
	id					INTEGER PRIMARY KEY AUTOINCREMENT,
	name				VARCHAR(50) NOT NULL,
	abreviation			VARCHAR(10) NULL,
	description			VARCHAR(200) NULL ,
	short_description	VARCHAR(60) NULL ,
	min_value			INT NULL ,
	max_value			INT NULL ,
	game_id				INT NOT NULL ,
	FOREIGN KEY (game_id) REFERENCES game (id) ON DELETE NO ACTION ON UPDATE NO ACTION);

INSERT INTO attribute_type VALUES(1, "Strength", "STR", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(2, "Dexterity", "DEX", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(3, "Constitution", "CON", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(4, "Intelligence", "INT", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(5, "Wisdom", "WIS", "long description", "short description", 0, 100, 1);
INSERT INTO attribute_type VALUES(6, "Charisma", "CHA", "long description", "short description", 0, 100, 1);

-- *******************************************************************************
-- USERS

DROP TABLE player;
CREATE TABLE player (
	id			INTEGER PRIMARY KEY AUTOINCREMENT,
	name		VARCHAR(50) NOT NULL UNIQUE,
	password	VARCHAR(10) NULL);

INSERT INTO player VALUES(1, "leandro", "123");
INSERT INTO player VALUES(2, "marijose", "123");
INSERT INTO player VALUES(3, "esteban", "123");
INSERT INTO player VALUES(4, "natalia", "123");

-- *******************************************************************************
-- RACES

DROP TABLE IF EXISTS race;
CREATE  TABLE IF NOT EXISTS race (
  id			INTEGER PRIMARY KEY AUTOINCREMENT,
  name	VARCHAR(64) NOT NULL);

INSERT INTO race VALUES(1, "human");
INSERT INTO race VALUES(2, "elf");
INSERT INTO race VALUES(3, "orc");

-- *******************************************************************************
-- CHARACTER CLASSES

DROP TABLE IF EXISTS class;
CREATE  TABLE IF NOT EXISTS class (
	id			INTEGER PRIMARY KEY AUTOINCREMENT,
	name	VARCHAR(64) NOT NULL);

INSERT INTO class VALUES(1, "class1");
INSERT INTO class VALUES(2, "class2");
INSERT INTO class VALUES(3, "class3");

-- *******************************************************************************
-- CHARACTERS

DROP TABLE IF EXISTS character ;
CREATE  TABLE IF NOT EXISTS character (
	id			INTEGER PRIMARY KEY AUTOINCREMENT,
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
	FOREIGN KEY (player_id )
		REFERENCES player (id )
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
	current_value		INT NOT NULL ,
	modifier			INT NULL,
	attribute_type_id	INT NOT NULL ,
	character_id		INT NOT NULL ,
	PRIMARY KEY (attribute_type_id, character_id) ,
	FOREIGN KEY (attribute_type_id )
		REFERENCES attribute_type (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	FOREIGN KEY (character_id )
		REFERENCES character (id )
		ON DELETE NO ACTION
		ON UPDATE NO ACTION);

INSERT INTO attribute VALUES(10, 0, 1, 1);
INSERT INTO attribute VALUES(10, 0, 2, 1);
INSERT INTO attribute VALUES(10, 0, 3, 1);
INSERT INTO attribute VALUES(10, 0, 4, 1);
INSERT INTO attribute VALUES(10, 0, 5, 1);
INSERT INTO attribute VALUES(10, 0, 6, 1);
INSERT INTO attribute VALUES(10, 0, 1, 2);
INSERT INTO attribute VALUES(10, 0, 2, 2);
INSERT INTO attribute VALUES(10, 0, 3, 2);
INSERT INTO attribute VALUES(10, 0, 4, 2);
INSERT INTO attribute VALUES(10, 0, 5, 2);
INSERT INTO attribute VALUES(10, 0, 6, 2);

COMMIT;
/* Display all the records from the table */
-- SELECT * FROM player;