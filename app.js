// 各个依赖包
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan'); // 修改变量名
const morgan = require('morgan')
const logger = require('./logger')

// 路由文件引用
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Express 引用实例化
const app = express();

// 视图模板设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用 morgan 打印日志
// app.use(logger('dev'));
app.use(morgan('dev'));

// 使用对 Post 来的数据 json 格式化
app.use(express.json());

// 使用对 表单提交的数据 进行格式化
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//  捕捉404错误 catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



//这里错误处理改成自己的

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

/**
* error handler
* @private
*/
// 处理非404的错误（throw 出来的错误)
const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message)
  const errorMsg = err.message
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {}
  })
}
app.use(_errorHandler)

module.exports = app;
