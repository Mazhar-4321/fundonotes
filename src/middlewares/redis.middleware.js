// import HttpStatus from 'http-status-codes'
// con
const HttpStatus = require('http-status-codes')
import {client} from '../config/database'

export const checkRedisForNotes = async (req, res, next) => {
  try {
    var cachedData=await client.HGETALL(req.body.userId)
    if(cachedData['userData']!==undefined){
        cachedData=JSON.parse(cachedData['userData'])
        res.status(HttpStatus.StatusCodes.OK).json({
            code: HttpStatus.StatusCodes.OK,
            msg:"From Cache",
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


