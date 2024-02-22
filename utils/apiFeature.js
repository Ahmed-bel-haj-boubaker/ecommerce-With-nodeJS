class ApiFeature {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  search() {
    // Check if the keyword exists in the query string
    if (this.queryString.keyword) {
      // Extract the keyword from the query string using object destructuring
      const { keyword } = this.queryString;
       console.log(keyword)

      // Construct the MongoDB query to search for documents containing the keyword in title or description
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          { title:keyword},
          { description:keyword }
        ]
      });
    }
  
    // Return the instance to maintain method chaining
    return this;
}
  

filter() {
    // Filtering: Construct MongoDB query based on query string parameters
    const queryStringObj = { ...this.queryString };
    console.log("Query string object:", queryStringObj);
  
    // Exclude pagination, sorting, and field selection parameters
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
  
    // Convert query string object to MongoDB query format
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
    console.log("Query string after modification:", JSON.parse(queryStr));
  
    // Execute filter query
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
}


  sort() {
    // 3 sorting  http://localhost:8000/api/product?sort=-sold,price
    if (this.queryString.sort) {
      // price, -sold ==> [price, -sold] price -sold
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      // eslint-disable-next-line no-const-assign
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    // 4 Filed Limiting http://localhost:8000/api/product?fields=title,price,sold
    if (this.queryString.fields) {
      const fildes = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fildes);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }


  pagination(){
    
  // 2 pagination  
  const page = this.queryString.page * 1 || 1; 
  const limit = this.queryString.limit * 1 || 5;
  const skip = (page - 1) * limit;
  this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
   
  return this;
  }
}

module.exports = ApiFeature;