-- Seed data for doctors table
INSERT INTO public.doctors (user_id, specialization, license_number)
VALUES ('f78e8ba0-1a2b-4b5c-a988-72e5822dfb1c', 'Cardiologist', 'DOC12345'),
       ('b45e7ac9-4d5e-9874-5678-a8b123456def', 'Dermatologist', 'DOC67890'),
       ('c56d8abc-9a12-4f56-a123-45c678d123f1', 'Pediatrician', 'DOC34567');

-- Seed data for user_meta table
INSERT INTO public.user_meta (email, password, role, name)
VALUES ('john.doe@example.com', 'hashed_password_1', 'Doctor', 'John Doe'),
       ('jane.doe@example.com', 'hashed_password_2', 'Patient', 'Jane Doe'),
       ('alice.smith@example.com', 'hashed_password_3', 'Doctor', 'Alice Smith'),
       ('bob.johnson@example.com', 'hashed_password_4', 'Patient', 'Bob Johnson');
