-- Seed data for wemake
-- profile_id: 8ff5aaec-aab7-464d-8f0d-4b673679c28a (profiles 테이블은 seed하지 않음, 이미 존재한다고 가정)

-- ============================================================
-- Jobs
-- ============================================================
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('Senior React Developer', 'We are looking for an experienced React developer to join our team.', 'Build and maintain web applications, code reviews, mentoring junior developers.', '5+ years of React experience, TypeScript proficiency.', 'Health insurance, remote work, stock options.', 'React, TypeScript, Next.js, TailwindCSS', 'TechCorp', 'https://via.placeholder.com/128', 'Seoul, Korea', 'https://example.com/apply/1', 'full-time', 'remote', '$100,000 - $120,000'),
('Backend Engineer', 'Join our backend team to build scalable APIs and services.', 'Design and implement RESTful APIs, optimize database queries.', '3+ years of Node.js or Python experience.', 'Flexible hours, learning budget, team lunches.', 'Node.js, PostgreSQL, Redis, Docker', 'DataFlow Inc', 'https://via.placeholder.com/128', 'Busan, Korea', 'https://example.com/apply/2', 'full-time', 'hybrid', '$70,000 - $100,000'),
('UI/UX Designer Intern', 'Great opportunity for aspiring designers to learn from industry experts.', 'Create wireframes, prototypes, and user research.', 'Portfolio required, Figma proficiency preferred.', 'Mentorship program, certificate of completion.', 'Figma, Adobe XD, User Research', 'DesignLab', 'https://via.placeholder.com/128', 'Remote', 'https://example.com/apply/3', 'internship', 'remote', '$0 - $50,000'),
('Freelance Mobile Developer', 'Looking for a freelance developer to build a cross-platform mobile app.', 'Develop iOS and Android app using React Native.', '2+ years of React Native experience.', 'Competitive hourly rate, flexible schedule.', 'React Native, TypeScript, Expo', 'AppStart', 'https://via.placeholder.com/128', 'Tokyo, Japan', 'https://example.com/apply/4', 'freelance', 'remote', '$50,000 - $70,000'),
('Part-Time DevOps Engineer', 'Help us maintain and improve our cloud infrastructure.', 'CI/CD pipelines, monitoring, infrastructure as code.', 'AWS or GCP experience required.', 'Remote friendly, flexible hours.', 'AWS, Terraform, GitHub Actions, Docker', 'CloudNine', 'https://via.placeholder.com/128', 'Osaka, Japan', 'https://example.com/apply/5', 'part-time', 'in-person', '$120,000 - $150,000');

-- ============================================================
-- Categories (products에서 참조)
-- ============================================================
INSERT INTO categories (name, description) VALUES
('Productivity', 'Tools to help you get more done in less time.'),
('Developer Tools', 'Software and utilities for developers.'),
('Design', 'Design tools, assets, and resources.'),
('Marketing', 'Marketing automation and analytics tools.'),
('Education', 'Learning platforms and educational resources.');

-- ============================================================
-- Products
-- ============================================================
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('TaskFlow', 'Manage tasks like a pro', 'A modern task management app with AI-powered prioritization.', 'Create tasks, set priorities, and let AI organize your workflow.', 'https://via.placeholder.com/64', 'https://taskflow.example.com', '{"views": 120, "reviews": 3}', '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 1),
('CodeSnap', 'Beautiful code screenshots', 'Generate beautiful screenshots of your code for sharing on social media.', 'Paste your code, select a theme, and export as PNG.', 'https://via.placeholder.com/64', 'https://codesnap.example.com', '{"views": 85, "reviews": 2}', '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 2),
('PixelKit', 'Design system in a box', 'A comprehensive design system with components, tokens, and guidelines.', 'Install the package, import components, and build consistent UIs.', 'https://via.placeholder.com/64', 'https://pixelkit.example.com', '{"views": 200, "reviews": 5}', '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 3),
('MailPilot', 'Email marketing made simple', 'An easy-to-use email marketing platform with drag-and-drop editor.', 'Design emails, segment audiences, and track performance.', 'https://via.placeholder.com/64', 'https://mailpilot.example.com', '{"views": 60, "reviews": 1}', '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 4),
('LearnHub', 'Interactive coding courses', 'A platform for interactive coding courses with real-time feedback.', 'Pick a course, write code in the browser, and get instant feedback.', 'https://via.placeholder.com/64', 'https://learnhub.example.com', '{"views": 310, "reviews": 7}', '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 5);

-- ============================================================
-- Product Upvotes
-- ============================================================
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a');


-- ============================================================
-- Reviews (rating: 1~5)
-- ============================================================
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 5, 'Amazing task manager! The AI prioritization is a game changer.'),
(2, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 4, 'Great tool for sharing code snippets. Could use more themes.'),
(3, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 5, 'Best design system I have used. Very well documented.'),
(4, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 3, 'Decent email tool but the template editor needs improvement.'),
(5, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 4, 'Love the interactive exercises. Great for beginners.');

-- ============================================================
-- GPT Ideas
-- ============================================================
INSERT INTO gpt_ideas (idea, views) VALUES
('An AI-powered meal planner that considers dietary restrictions and local grocery prices.', 15),
('A browser extension that summarizes long email threads into bullet points.', 42),
('A collaborative whiteboard app designed specifically for remote retrospectives.', 8),
('A CLI tool that auto-generates changelog entries from git commit messages.', 27),
('A platform that matches open source projects with contributors based on skill level.', 63);

-- ============================================================
-- GPT Ideas Likes
-- ============================================================
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a');

-- ============================================================
-- Topics
-- ============================================================
INSERT INTO topics (name, slug) VALUES
('React', 'react'),
('Backend', 'backend'),
('DevOps', 'devops'),
('Career', 'career'),
('Show & Tell', 'show-and-tell');

-- ============================================================
-- Posts
-- ============================================================
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('What state management do you use in 2026?', 'Curious about the current landscape. Redux? Zustand? Jotai? Something else?', 1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a'),
('PostgreSQL vs MySQL for a new SaaS project', 'Starting a new project and trying to decide between Postgres and MySQL. What are the trade-offs?', 2, '8ff5aaec-aab7-464d-8f0d-4b673679c28a'),
('How do you handle secrets in CI/CD?', 'Looking for best practices on managing environment variables and secrets in GitHub Actions.', 3, '8ff5aaec-aab7-464d-8f0d-4b673679c28a'),
('Tips for landing your first developer job', 'I recently got my first dev job. Here are some things that helped me during the process.', 4, '8ff5aaec-aab7-464d-8f0d-4b673679c28a'),
('I built a CLI tool for generating Drizzle schemas', 'Just shipped a small open source tool. Would love feedback from the community!', 5, '8ff5aaec-aab7-464d-8f0d-4b673679c28a');

-- ============================================================
-- Post Upvotes
-- ============================================================
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a');

-- ============================================================
-- Post Replies (대댓글 포함)
-- ============================================================
INSERT INTO post_replies (post_id, parent_id, profile_id, reply) VALUES
(1, NULL, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 'I switched to Zustand recently and it has been great!'),
(1, NULL, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 'Jotai for atomic state, Zustand for global. Best combo.'),
(1, 1, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 'Agreed! Zustand is so much simpler than Redux.'),
(2, NULL, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 'Postgres all the way. JSONB support alone is worth it.'),
(3, NULL, '8ff5aaec-aab7-464d-8f0d-4b673679c28a', 'We use GitHub Actions secrets + Doppler for staging/prod.');

-- ============================================================
-- Teams
-- ============================================================
INSERT INTO team (product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('PetConnect', 3, 30, 'idea', 'React Developer, UI Designer', 'A social platform for pet owners to connect'),
('BudgetBuddy', 5, 20, 'prototype', 'Backend Developer, Data Analyst', 'An AI budgeting app for freelancers'),
('FitTrack', 2, 50, 'mvp', 'Mobile Developer, Product Manager', 'Workout tracker with AI coaching'),
('EduStream', 4, 25, 'product', 'Full-Stack Developer, Content Creator', 'Live streaming platform for educators'),
('GreenRoute', 3, 33, 'idea', 'Backend Developer, ML Engineer', 'Eco-friendly route planner for delivery');
