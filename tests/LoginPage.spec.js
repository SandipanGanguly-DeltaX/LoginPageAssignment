const {test,expect}= require('@playwright/test');

test ("login page should load fine without any error", async ({page})=>
    {


       await page.goto("https://production1.adbox.pro/App/Login");
       expect(await page.screenshot()).toMatchSnapshot('landing.png');
       
       
    });

test (" verify that the username text field should contain username as placeholder", async ({page})=>
      {
  
  
         await page.goto("https://production1.adbox.pro/App/Login");
         const UsernamePlaceholder= await page.locator('#txtUsername').getAttribute('placeholder');
         expect(UsernamePlaceholder).toEqual('Username');
         
         
      });

test (" verify that the password  text field should contain Password as placeholder", async ({page})=>
         {
     
     
            await page.goto("https://production1.adbox.pro/App/Login");
            const passwordPlaceholder= await page.locator('#txtPassword').getAttribute('placeholder');
            expect(passwordPlaceholder).toEqual('Password');
            
            
         });


test ("verify that the user name text field should accept alphanumeric series as input ", async ({page})=>
            {
        
        
               await page.goto("https://production1.adbox.pro/App/Login");
               await page.locator('#txtUsername').fill('abcdef12345@#');
               await page.locator('#btnLogin').click();
               const passwordResponse= await page.locator('#txtPassword').getAttribute('placeholder');
               expect(passwordResponse).toEqual('Please enter your password');            
               
            });

test ("verify that the password should accept alphanumeric series as input  ", async ({page})=>
               {
           
           
                  await page.goto("https://production1.adbox.pro/App/Login");
                  await page.locator('#txtPassword').fill('abcdef12345@#');
                  await page.locator('#btnLogin').click();
                  const userNameResponse= await page.locator('#txtUsername').getAttribute('placeholder');
                  expect(userNameResponse).toEqual('Please enter your username');            
                  
   });



test ("verify that giving valid username and invalid password user should not able to login and a error message should be displayed", async ({page})=>
      {
  
  
         await page.goto("https://production1.adbox.pro/App/Login");
         await page.locator('#txtUsername').fill('sandipan.ganguly@deltax.com');
         await page.locator('#txtPassword').fill('abcdef12345@#');
         await page.locator('#btnLogin').click();
         const response= await page.getByRole('alert').textContent();
         console.log(response);
         expect(response).toContain("Invalid attempts");
         
         
});

test ("verify that giving invalid username and valid password user should not able to login and a error message should be displayed", async ({page})=>
   {


      await page.goto("https://production1.adbox.pro/App/Login");
      await page.locator('#txtUsername').fill('abc');
      await page.locator('#txtPassword').fill('ads4good');
      await page.locator('#btnLogin').click();
      const response= await page.getByRole('alert').textContent();
      console.log(response);
      expect(response).toEqual('× Invalid attempts shall result in your account getting locked.You can use forgot password to reset password and proceed.');
      
      
      
});


test ("verify that giving invalid username and invalid password user should not able to login and a error message should be displayed", async ({page})=>
   {


      await page.goto("https://production1.adbox.pro/App/Login");
      await page.locator('#txtUsername').fill('bcd');
      await page.locator('#txtPassword').fill('def');
      await page.locator('#btnLogin').click();
      const response= await page.getByRole('alert').textContent();
      console.log(response);
      expect(response).toEqual('× Invalid attempts shall result in your account getting locked.You can use forgot password to reset password and proceed.');
      
      
      
});


test (" verify that giving valid username and valid password user should able to login and land on the business profile page ", async ({page})=>
   {


      await page.goto("https://production1.adbox.pro/App/Login");
      await page.locator('#txtUsername').fill('sandipan.ganguly@deltax.com');
      await page.locator('#txtPassword').fill('ads4good');
      await page.locator('#btnLogin').click();
      const newResponse = await page.locator('title').textContent();
      expect(newResponse).toEqual("Business Profiles");
      
});

test ("verify that clicking on forget password the forget password page should load fine  ", async ({page})=>
   {


      await page.goto("https://production1.adbox.pro/App/Login");
      await page.getByText('Forgot your password').click();
      const newPageresponse= await page.locator('#UserName').getAttribute('placeholder');
      expect(newPageresponse).toEqual('Email');
});