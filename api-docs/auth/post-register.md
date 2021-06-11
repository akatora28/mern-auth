# Register
Create a new account  
**URL:** `/api/auth/register`  
**Method:** `POST`  
**Auth required:** No (obviously)  
**Expected Body:**  
```json
{
    "email": "[valid email address]",
    "password": "[password in plain text]"
}
```
  
## Success Response
**Code:** `200 OK`
```JSON
{
    "status": "success",
    "message": "User created successfully"
}
```

## Error Response
**Condition:** User with email already exists  
**Code:** `409`
```JSON
{
    "status": "error",
    "message": "User created successfully"
}
```