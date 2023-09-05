import{
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
    DeleteItemCommand,
    UpdateItemCommand
} from "@aws-sdk/client-dynamodb";

const tableName = "CourseTable";
const indexName= "courseName-index";
const types = {
    courseCode: "S",
    teacherName: "S",
    courseName: "S",
    month: "N",
    students:"SS",
    year: "N"
};

export const createNewCourse = async (body, dynamodb) => {
  const saveParameters = {
      TableName: tableName,
      Item:{
          "courseCode":{
            S: body.courseCode 
          },
          "teacherName":{
            S: body.teacherName  
          },
          "courseName":{
            S: body.courseName   
          },
          "month":{
            N: body.month.toString()   
          },
          "students":{
            SS: body.students   
          },
          "year":{
            N: body.year.toString()   
          }
      }
  };
  const command = new PutItemCommand(saveParameters);
  return await dynamodb.send(command);
};

export const getCourseByField = async (field, value, dynamodb) => {
  let fieldValue = `:${field}Value`;
  
  const queryParams = {
    TableName: tableName,
    IndexName: indexName,
    KeyConditionExpression: `${field} = ${fieldValue}`,
    ExpressionAttributeValues: {
      [fieldValue]: {
        "S": value.replace("%20", " ")
      }
    }
  };
  
  const command = new QueryCommand(queryParams);
  
  return await dynamodb.send(command);
};

export const getCourseBYFilter = async(queryStrings, dynamodb) => {
  let filters = {};
  if(queryStrings){
      for(const key of Object.keys(queryStrings)){
          filters[key] = {
              "AttributeValueList":[{
                  [types[key]]: queryStrings[key]
              }],
              "ComparisonOperator" : "EQ"
          };
      }
  }
  const scanParams = {
      TableName: tableName
  };
  
  if(Object.keys(filters).length > 0){
      scanParams.ScanFIlter = filters;
  }
  
  const command = new ScanCommand(scanParams);
  
  return await dynamodb.send(command);
};

export const deleteCourse = async (courseCode,teacherName,dynamodb) => {
  
  const deleteParams = {
    TableName: tableName,
    Key:{
      "courseCode":{
        "S": courseCode
      },
      "teacherName":{
        "S": teacherName
      }
    }
  };
  const command = new DeleteItemCommand(deleteParams);
  return await dynamodb.send(command);
  
};



export const getCourseItem = async (courseCode,teacherName,dynamodb) => {
  const getParams = {
    TableName: tableName,
    Key: {
      "courseCode":{
        S: courseCode.replace('%20',' ')
      },
      "teacherName":{
        S: teacherName.replace('%20',' ')
      }
    }
    
  };
  
  const command = new GetItemCommand(getParams);
  const result = await dynamodb.send(command);
  return result;
  
};

export const updateCourse = async (body, dynamodb) => {
  let params = {
    TableName: tableName,
    Key: {},
    UpdateExpression: "SET",
    ExpressionAttributeName: {},
    ExpressionAttributeValues: {}
  };
  
  for(const key of Object.keys(body)){
    let typeF = types[key] !== undefined ? types[key]: "S";
    
    if(["courseCode","teacherName"].includes(key)){
      params.Key[key] = {
        [typeF]: body[key]
      };
    } else{
      params.UpdateExpression += ` #${key.toLowerCase()} = :${key.toLowerCase()},`;
      params.ExpressionAttributeName[`#${key.toLowerCase()}`] = key;
      params.ExpressionAttributeValues[`:${key.toLowerCase()}`] = {
        [typeF]: (typeF === "N" ? body[key].toString():body[key]) 
      };
      
    }
  }
  
  params.UpdateExpression = params.UpdateExpression.replace(/,\s*$/, "");
  
  const command = new UpdateItemCommand(params);
};

