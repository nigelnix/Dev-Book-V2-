const catchAsync = (v) => (req, res, next) => {
    v(req, res, next).catch(next);
};
export { catchAsync as default };
