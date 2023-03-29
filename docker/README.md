## This is folder for database docker container

# how to run (development environment)

```
cd Todolist-assignment
```

if already run

```
docker-compose down
```

view the console log

```
docker-compose up --build
```

or run in background

```
docker-compose up --build -d
```

# how to create user (TODO: might migrate this to script)

connect to database using comprass and link
use database

```
use mydb
```

create collection

```
db.createCollection("tasks")
```

create user

```
db.createUser({user: "test", pwd: "test", roles: [{role: "readWrite", db: "mydb"}]})
```
