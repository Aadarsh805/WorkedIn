// a function to avoid writing try catch repititively
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
};