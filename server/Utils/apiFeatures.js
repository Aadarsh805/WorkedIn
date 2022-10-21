class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }

    sort() {
        if (this.queryString.sort) {
          const sortBy = this.queryString.sort.split(",").join(" ");
          // console.log(sortBy);
          this.query = this.query.sort(sortBy);
        } else {
          this.query = this.query.sort("createdAt");
        }
        return this;
      }
  
    paginate() {
      //  page=2&limit=10, 1-10 => page1, 11-20 => page2, ....
      //  query = query.skip(10).limit(10) => for Page2
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 10;
      const skipBy = (page - 1) * limit;
  
      this.query = this.query.skip(skipBy).limit(limit);
  
      return this;
    }
}

module.exports = APIFeatures