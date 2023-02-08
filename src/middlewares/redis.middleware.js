// import HttpStatus from 'http-status-codes'
// con
const HttpStatus = require('http-status-codes')
import {client} from '../index.js'
export const checkRedisForNotes = async (req, res, next) => {
  try {
    
    var cachedData=await client.HGETALL(req.body.userId)
    
    if(cachedData['userData']!==undefined){
        cachedData=JSON.parse(cachedData['userData'])
        console.log("From Cache")
        res.status(HttpStatus.StatusCodes.OK).json({
            code: HttpStatus.StatusCodes.OK,
            data: cachedData
          });
    }else{
        console.log("cache Miss")
    next();
    }
  } catch (error) {
    next(error);
  }
}


