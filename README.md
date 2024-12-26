# The Magazine Platform for The University
We are pleased to introduce to you our team's project this time, Magazinehub. Here we would like to introduce some outstanding features of Magazinehub. In Magazinehub, we will take turns as admin, manager, coordinator and contributor. On this Magazinehub website, contributors will be able to contribute and submit articles to the website, and besides, the coordinator will be responsible for managing articles in the faculty for each contributor. The manager will manage all contributions on the system and the admin will manage the entire system.

## 1. Authenticated user features:
### 1.1 Login Screen
![Login_Screen](https://github.com/user-attachments/assets/ab75f6df-0bd7-4c3c-87ce-eb18a9dbeb8d)

### 1.2 First-time login with granted account and change initial password
![Temporary_Account_Sent_Via_Mail](https://github.com/user-attachments/assets/5596e8e7-1dce-417c-8251-8ca70f147cc6)

As the figure above has shown, we can use the granted account to login into the system. However, the granted password above is called “initial password”, which generated randomly by the back-end and must be changed when the user login in the first-time

![Change_Initial_Password](https://github.com/user-attachments/assets/8f182aa0-ab2f-412a-8726-707824fd5b74)

Then, after logging with granted account, the users are required to change their initial password by entering their own new password following with a confirm new password. This feature is implemented to ensure that no one except the owner of the granted account can have the right to access it.

![Change_Initial_Password_Successfully](https://github.com/user-attachments/assets/39953768-becd-4d97-8a45-6ade4a26a194)

Now, the users can login with their recently changed password instead of using the initial password.

### 1.3 Update profile and Avatar
![Access_Update_Profile](https://github.com/user-attachments/assets/7ec874ec-b0df-472b-bc2b-6eb28bc836f0)

As the figure above illustrated, the users can oversee their account information my clicking “My account” tab on the top-right corner of the screen. Then, they can click “Edit to update their profile”

![Update_Profile_Form](https://github.com/user-attachments/assets/87eabf1a-116d-4552-b3e4-8d9e666efda5)

Optionally, they can change their first name, last name or avatar image.

![Update_Profile_Successfully](https://github.com/user-attachments/assets/b0f5e83a-b201-4eb3-b15a-c407fcaaa585)

After updating profile successfully, they can see the changed information at the top-right corner again.

## 2. Guest features
### 2.1 Home Page Screen
![Home_Page_Screen_Top_Half](https://github.com/user-attachments/assets/375680f7-cf0d-4c76-bc26-ac8335bb31e1)

Without requiring any credential, guests can access the home page with multiple published contributions are divided into faculty sections

![Home_Page_Responsiveness](https://github.com/user-attachments/assets/f0149e8b-dcc3-4401-9450-3852a13f417b)

### 2.2 Exploring published contributions
![Exploring_Published_Contributions](https://github.com/user-attachments/assets/44711b77-201f-46a9-b6c4-7d9b666788f0)

After clicking “Explore more ->” of the faculty that they want, they can filter the published contribution by the period and sort them by multiple criteria such as title (A-Z) (Z-A), created (newest) (oldest) as well as searching by their name and description. Note: Guest can only see the contribution with status “Published” by the Coordinators of faculties.

## 3. Contributor features
![Access_To_Contributor_Page](https://github.com/user-attachments/assets/4063ea44-ae68-466c-8efd-e57075c64519)

When logged in with contributor role, we must navigate to “Contributor Page” to access all the contributor-related features

### 3.1 Submit new contribution
![Select_Academic_Year](https://github.com/user-attachments/assets/81d3c8dd-3b61-44bd-8b79-ed61726c0ad4)

Firstly, to submit a new contribution, Contributor must navigate to “Contribute” screen. Then, select the period that they want the contribution belongs to. For example, we will choose Academic year 2024.

![Submit_Contribution_Form](https://github.com/user-attachments/assets/bed611e5-49aa-471e-8b54-d25a5c402c5c)

Secondly, after selecting a period to submit, Contributor must fulfill the submission form including: Title, Description, Image and Document. The accepted Image extensions are: .webp, .png, .jpg, and .jpeg and the accepted Document extensions are: .docx and .pdf

![confirm_modal_after_submit](https://github.com/user-attachments/assets/e8112e51-8003-44e5-aefe-4e9271487e87)

Next, after clicking “Submit” button, a confirm model will be shown to enforce the Contributor to accept the Terms of Service.

![TermOfService](https://github.com/user-attachments/assets/2097d923-69aa-4e1e-bdb1-387830241fb6)

![Email_Notify_Submition](https://github.com/user-attachments/assets/0e4d8749-dd4a-42bb-ab3a-a6425af6a4b5)

Finally, the Coordinator of the faculty will be notified via email about the new submitted contribution

### 3.2 View My Contribution
![View_Self_Contribution](https://github.com/user-attachments/assets/eb2c34be-a5a9-4e9a-95f8-fea335562cdc)

In the My contribution screen, Contributors can view their own submitted contributions. Moreover, they are also allowed to apply complex searching, filtering, and sorting. For example, as the figure above has shown, the contributions can be filtered by Status, Period and can be sorted by Newest, Oldest, A-Z, Z-A, etc. as well as searching by title and description.

### 3.3 Update Contribution
![Update_Contribution](https://github.com/user-attachments/assets/fb7381ec-272f-48f4-9ce5-a3a12928795f)

To update contribution, Contributors must select one of the submitted contributions to update. Optionally, they are allowed to only edit one of the four fields as the above has shown. Besides that, they also can view the current image and current document associated with the contribution. Moreover, they can also see the feedbacks if there are available feedbacks from the faculty Coordinator.

### 3.4 View faculty’s approved contributions
![View_Faculty_Approved_Contribution](https://github.com/user-attachments/assets/74bc3da5-8759-4bf7-8455-72fc55220f81)

Outside of the management of oneself contributions, Contributors can also view all the approved contributions that belongs to their faculty.

![View_Approved_Contribution_Details](https://github.com/user-attachments/assets/760247a0-0c6d-4914-99ee-fe7c5f1d8d09)

Moreover, they can click on the contribution that they want to see the details and download associated document.

## 4. Coordinator features
### 4.1 Create account for Contributor
![Create_Contributor_Account](https://github.com/user-attachments/assets/235acd6c-d130-42f5-b24b-0bd3fe32f464)

To create account for contributor that belong to oneself faculty, Coordinators can fulfill the Create Contributor account form with the FirstName, LastName and Email of the Contributor to create.

![Contributor_Account_Email](https://github.com/user-attachments/assets/20477044-8d57-4ff2-b331-18c5d98d5f13)

After that, the Contributor will receive an email that contains their account information such as Email/Username and random generated initial password. Then, they can use this information to log in into the system

### 4.2 View Faculty Contributions
![View_Faculty_Contributions](https://github.com/user-attachments/assets/3e48e5d5-042a-49da-b3c7-28aeac892fe7)

In Coordinators site, we also allow them to view all the contribution that belongs to their faculty. Furthermore, they can apply advanced filtering/searching/sorting freely that matching a various of criteria. For example, as being shown by the figure above, we can filter by Status, Period and sorting by Newest, Oldest, A-Z, Z-A, etc. as well as searching by title and description of the contributions.

### 4.3 Provide feedback on contribution
![Provide_Feedback](https://github.com/user-attachments/assets/6af683fe-1105-4211-ac1e-86c90a5f1714)

### 4.4 Approve / Reject Contribution
![image](https://github.com/user-attachments/assets/9b2ce1f6-7c6c-4ba7-8404-b4fcfa9c66ba)

### 4.5 Publish/Unpublish contribution
![Publish/Unpublish_Contribution](https://github.com/user-attachments/assets/22dcf58b-7c82-45a1-90bb-942814ed4869)

### 4.6 Dashboard for Coordinator
![Coordinator_Dashboard](https://github.com/user-attachments/assets/8cfb365f-b20d-46ba-ac51-51507be99d95)

## 5. Manager features
### 5.1 View all contribution in the system
![All_Contributions_In_System](https://github.com/user-attachments/assets/06fdc490-0996-4ba2-901c-2e847bf2cbfb)

### 5.2 Download All Contributions as Zip
![image](https://github.com/user-attachments/assets/cfb7c35a-a97c-4ce2-aeba-d2a2d65c0808)

### 5.3 Mangager Dashboard.
![Manager_Dashboard](https://github.com/user-attachments/assets/03a3fc84-557a-421e-89d0-6a8d4165a0e1)

![image](https://github.com/user-attachments/assets/fbc2d6f9-9a0a-47ee-8f94-ec413f8b9010)

## 6. Admin Features
### 6.1 Manage user
![User_Table](https://github.com/user-attachments/assets/9dd322bf-78b9-43f4-ae1c-a2dcf5b81ef4)

### 6.2 Manage Period.
![Manage_Period](https://github.com/user-attachments/assets/d1e835d3-10ab-4d60-8cbf-6ee5ffacc90c)

In the Admin Manage Periods interface, administrators can conveniently access a comprehensive list of all periods within the system. This functionality provides administrators with a centralized view of all academic periods, facilitating efficient management and oversight.

![Create_New_Period](https://github.com/user-attachments/assets/9b471acf-9dbd-437f-94d0-0aa5d1fd561d)

To create a new period, administrators simply need to click the "Create Period" button on the screen. This action triggers a modal to appear, prompting administrators to fill out a form with essential details such as Academic Year, First Deadline, and Second Deadline. It's important to note that, according to our business rules, each academic year can only have one period.

![update_deadline](https://github.com/user-attachments/assets/845a33d9-1be1-47cb-b35f-ae8ad25c1903)

Furthermore, administrators have the ability to update the deadlines for specific periods with ease. By clicking on a particular period, administrators can access and modify the associated deadlines as necessary, ensuring accurate and up-to-date period management.

### 7.3 Manage faculty
![Manage_Faculty](https://github.com/user-attachments/assets/51818101-1bd6-42f1-a537-e83d5e488778)


### 7.4 Create account for all users

![Create_All_Form](https://github.com/user-attachments/assets/98405429-ddc3-4b63-8152-c494b622f301)

As the figure above has shown, administrators can create accounts for users across all roles and faculty in the system. While similar to manager and coordinator roles, admins have a distinction: for Admins and Managers, the faculty selection is locked, as they do not belong to any specific faculty by default. This ensures efficient and accurate account creation, maintaining consistency with role-specific attributes.

![Email_Account](https://github.com/user-attachments/assets/1ee3f7a4-f2cd-493c-94ee-b39fe14826b9)

Finally, the user created by Admin will receive an email containing all the credentials that they can use to access the system. 









