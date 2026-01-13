# Backend Restart Instructions - Fix 404 Errors

## The Problem
You're getting 404 errors for `/api/operators/register` and `/api/operators/my-operator` even though the routes are defined in the code.

## The Solution
**The backend server needs to be restarted** to load the updated controller code.

## Step-by-Step Restart Instructions

### Option 1: If using npm run start:dev (Recommended)

1. **Stop the current backend server:**
   - Find the terminal/command prompt where the backend is running
   - Press `Ctrl+C` to stop it
   - Wait for it to fully stop

2. **Clear the dist folder (optional but recommended):**
   ```bash
   cd Backend
   rm -rf dist
   # Or on Windows PowerShell:
   Remove-Item -Recurse -Force dist
   ```

3. **Restart the backend:**
   ```bash
   cd Backend
   npm run start:dev
   ```

4. **Verify it started correctly:**
   Look for these messages in the console:
   ```
   ✓ Application is running on: http://localhost:3000/api
   ✓ OperatorController initialized
   ✓ Operator routes should be available at:
     POST /api/operators/register (requires JWT)
     GET /api/operators/my-operator (requires JWT)
   ```

### Option 2: If backend is running as a service or in background

1. **Find and kill the Node process:**
   ```powershell
   # Find Node processes
   Get-Process -Name node
   
   # Kill specific process (replace PID with actual process ID)
   Stop-Process -Id <PID> -Force
   ```

2. **Or kill all Node processes (be careful!):**
   ```powershell
   Get-Process -Name node | Stop-Process -Force
   ```

3. **Then restart:**
   ```bash
   cd Backend
   npm run start:dev
   ```

## Verification Steps

After restarting, verify the routes work:

1. **Check backend console** for:
   - `✓ Application is running on: http://localhost:3000/api`
   - `✓ OperatorController initialized`
   - No error messages

2. **Test with curl (if you have a token):**
   ```bash
   # Test if route exists (should get 401 Unauthorized, not 404)
   curl -X GET http://localhost:3000/api/operators/my-operator
   ```
   - If you get `401 Unauthorized` → Route exists! ✅
   - If you get `404 Not Found` → Route not registered ❌

3. **Check frontend:**
   - Refresh the page
   - Try the operator registration again
   - Check browser Network tab - should see 401 or 200, not 404

## Common Issues

### Issue: Still getting 404 after restart
**Possible causes:**
1. **Compilation errors** - Check backend console for TypeScript errors
2. **Database connection failure** - Routes won't register if DB connection fails
3. **Module not imported** - Verify OperatorModule is in AppModule imports

**Solution:**
- Check backend console for error messages
- Verify database is running and credentials are correct
- Check that `Backend/src/app.module.ts` includes `OperatorModule` in imports

### Issue: Port 3000 already in use
**Solution:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Issue: Backend won't start
**Check:**
- Database connection (check .env file)
- Node version compatibility
- All dependencies installed (`npm install`)

## Quick Test

Run this to verify the backend is responding:
```bash
# Should return 404 for root (expected)
curl http://localhost:3000/api

# Should return 401 (unauthorized) or 200, NOT 404
curl http://localhost:3000/api/operators/my-operator
```

If the second command returns 404, the routes aren't registered and you need to check:
1. Backend console for errors
2. OperatorModule is imported in AppModule
3. No compilation errors

## Still Having Issues?

1. Check `Backend/src/app.module.ts` - ensure `OperatorModule` is in the imports array
2. Check `Backend/src/modules/operator/operator.module.ts` - ensure `OperatorController` is in controllers array
3. Check backend console for any error messages
4. Verify database connection is successful
5. Try deleting `Backend/dist` folder and restarting
