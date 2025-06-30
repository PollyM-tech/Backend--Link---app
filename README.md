# 📎 LinkSaver App

Welcome to **LinkSaver**, a full-stack app that helps users save, organize, and manage their favorite links. This was a group project built with React, Flask, and Tailwind CSS as part of our software engineering curriculum at Moringa School.

## ✨ Overview

The goal of this app is to make it easier for users to keep track of useful links—whether for study, work, or personal projects. Each user can securely sign up, log in, and manage their own collection of categorized links.

---

## 🎥 Demo Video  
Watch our walkthrough here: [LinkSaver App Demo on Loom](https://www.loom.com/share/9d793c0cd28a47a6a23306a6dc87d36d)

## ✅ User Stories

We focused on building features that directly respond to these user stories:

- As a user, I want to **sign up and log in securely** so my links are private.
- I want to be able to **add, view, edit, and delete links** with useful details like a title, URL, and description.
- I want to **organize my links into categories** (like “Learning”, “Entertainment”, etc.).
- I want to **filter my saved links by category** so I can find things faster.
- I want the option to **log out when I’m done** using the app.

---

## 🔧 MVP Features

To meet the user stories above, our MVP includes the following features:

### 👤 Authentication
- Signup and login with secure password hashing
- Logout functionality
- Session-based user management

### 🔗 Link Management
- Users can create, read, update, and delete their links
- Each link includes a title, description, URL, and category
- All link actions are scoped to the logged-in user
- We implemented **soft deleting on the frontend** (links disappear from view without being fully removed)
- In future updates, we plan to support **soft deleting in the backend** using a deleted flag in the database

### 🗂️ Categories
- Users can create and assign custom categories
- Links can be filtered by category on the dashboard

### 💻 Frontend
- Built with **React** and styled with **Tailwind CSS**
- Uses **Lucide icons** for a clean, modern UI
- Features:
  - Login and signup pages
  - Dashboard to display saved links
  - Modal forms for adding and editing links
  - Category filter to narrow down visible links
  - Axios for API communication with the backend

---

## 🚀 Tech Stack

| Frontend        | Backend       | Styling         | Auth         |
|-----------------|---------------|-----------------|--------------|
| React (Vite)    | Flask (Python) | Tailwind CSS    | Flask-Login  |
| Axios           | SQLAlchemy     | Lucide Icons    | bcrypt       |

---


## 🧪 Future Improvements

If we had more time, we would:
- Allow reordering or pinning favorite links
- Implement dark mode
- Add animations to modals and transitions
- Handle soft deleting on the backend so deleted links can be recovered

---

## 👥 Team

This project was built by our Moringa School group for Phase 4. We worked collaboratively on both frontend and backend tasks using GitHub, Google meet and WhatsApp to manage our workflow.