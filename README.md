# Mock server #
## Server for simple mock rest services implementation. ##

### Getting Started

To install node modules run

 ```shell
 npm install
 ```

 To start run

 ```shell
 npm start
 ```

## Examples
Let's implement accounts service *http://127.0.0.1:3000/accounts*.
To create simple GET service, just add your *list.json* file into "data" folder with specific path [*/data/accounts/list.json*](https://github.com/smirnovigor/mockServer/blob/master/data/accounts/list.json).
It's enough to simple GET service.

To crete custom GET route, you should add [route](https://github.com/smirnovigor/mockServer/blob/master/routes/accounts/index.js) and [controller](https://github.com/smirnovigor/mockServer/blob/master/controllers/accounts/index.js) for this. 



http://127.0.0.1:3000/accounts/simple

http://127.0.0.1:3000/accounts?startsAt=2014-04-05T17:25:04Z&endsAt=2014-04-15T17:25:04Z

http://127.0.0.1:3000/accounts/3

put and post
http://127.0.0.1:3000/accounts