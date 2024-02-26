
# Documentation

Current docker-compose.yml configuration for mySQL
- Access the database within a containerized app using : ```mysql_db:3306```
- You might want to consider adding  Prisma since vanilla Javascript and ORM databases might be hard to work with ⚠️
    - Or you could use Python with Flask or Django to access mySQL up to you


```bash
    --- Database Credentials ---
    user: root 
    password:  Password123!
    hostname: mysql_db
    port: 3306
    db: <your database name>
```

## Resources 

[Prisma Documentation](https://www.prisma.io/)

[mySQL integration into Express using Prisma](https://www.youtube.com/watch?v=tC-P5BiWtas)


