--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: animals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.animals (
    animal_id bigint NOT NULL,
    breed character varying(255),
    color character varying(255),
    birthday date,
    gender character varying(255),
    animal_name character varying(255),
    species character varying(255),
    animal_customer_id integer NOT NULL
);


ALTER TABLE public.animals OWNER TO postgres;

--
-- Name: animals_animal_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animals_animal_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animals_animal_customer_id_seq OWNER TO postgres;

--
-- Name: animals_animal_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animals_animal_customer_id_seq OWNED BY public.animals.animal_customer_id;


--
-- Name: animals_animal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.animals_animal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.animals_animal_id_seq OWNER TO postgres;

--
-- Name: animals_animal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.animals_animal_id_seq OWNED BY public.animals.animal_id;


--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    appointment_id bigint NOT NULL,
    appointment_date timestamp(6) without time zone,
    appointment_animal_id integer NOT NULL,
    appointment_doctor_id integer NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: appointments_appointment_animal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_animal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_animal_id_seq OWNER TO postgres;

--
-- Name: appointments_appointment_animal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_animal_id_seq OWNED BY public.appointments.appointment_animal_id;


--
-- Name: appointments_appointment_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_doctor_id_seq OWNER TO postgres;

--
-- Name: appointments_appointment_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_doctor_id_seq OWNED BY public.appointments.appointment_doctor_id;


--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointments_appointment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointments_appointment_id_seq OWNER TO postgres;

--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointments_appointment_id_seq OWNED BY public.appointments.appointment_id;


--
-- Name: available_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.available_dates (
    av_date_id bigint NOT NULL,
    av_date date,
    availabledate_doctor_id integer NOT NULL
);


ALTER TABLE public.available_dates OWNER TO postgres;

--
-- Name: available_dates_av_date_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.available_dates_av_date_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.available_dates_av_date_id_seq OWNER TO postgres;

--
-- Name: available_dates_av_date_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.available_dates_av_date_id_seq OWNED BY public.available_dates.av_date_id;


--
-- Name: available_dates_availabledate_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.available_dates_availabledate_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.available_dates_availabledate_doctor_id_seq OWNER TO postgres;

--
-- Name: available_dates_availabledate_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.available_dates_availabledate_doctor_id_seq OWNED BY public.available_dates.availabledate_doctor_id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id bigint NOT NULL,
    customer_address character varying(255),
    customer_city character varying(255),
    customer_mail character varying(255),
    customer_name character varying(255),
    customer_phone character varying(255)
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_customer_id_seq OWNER TO postgres;

--
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    doctor_id bigint NOT NULL,
    doctor_address character varying(255),
    doctor_city character varying(255),
    doctor_mail character varying(255),
    doctor_name character varying(255),
    doctor_phone character varying(255)
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_doctor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctors_doctor_id_seq OWNER TO postgres;

--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_doctor_id_seq OWNED BY public.doctors.doctor_id;


--
-- Name: vaccines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vaccines (
    vaccine_id bigint NOT NULL,
    code character varying(255),
    vaccine_name character varying(255),
    finish_date date,
    start_date date,
    animal_vaccine_id integer NOT NULL
);


ALTER TABLE public.vaccines OWNER TO postgres;

--
-- Name: vaccines_animal_vaccine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vaccines_animal_vaccine_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vaccines_animal_vaccine_id_seq OWNER TO postgres;

--
-- Name: vaccines_animal_vaccine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vaccines_animal_vaccine_id_seq OWNED BY public.vaccines.animal_vaccine_id;


--
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vaccines_vaccine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vaccines_vaccine_id_seq OWNER TO postgres;

--
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vaccines_vaccine_id_seq OWNED BY public.vaccines.vaccine_id;


--
-- Name: animals animal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animals ALTER COLUMN animal_id SET DEFAULT nextval('public.animals_animal_id_seq'::regclass);


--
-- Name: animals animal_customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animals ALTER COLUMN animal_customer_id SET DEFAULT nextval('public.animals_animal_customer_id_seq'::regclass);


--
-- Name: appointments appointment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_id SET DEFAULT nextval('public.appointments_appointment_id_seq'::regclass);


--
-- Name: appointments appointment_animal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_animal_id SET DEFAULT nextval('public.appointments_appointment_animal_id_seq'::regclass);


--
-- Name: appointments appointment_doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments ALTER COLUMN appointment_doctor_id SET DEFAULT nextval('public.appointments_appointment_doctor_id_seq'::regclass);


--
-- Name: available_dates av_date_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.available_dates ALTER COLUMN av_date_id SET DEFAULT nextval('public.available_dates_av_date_id_seq'::regclass);


--
-- Name: available_dates availabledate_doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.available_dates ALTER COLUMN availabledate_doctor_id SET DEFAULT nextval('public.available_dates_availabledate_doctor_id_seq'::regclass);


--
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- Name: doctors doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctors_doctor_id_seq'::regclass);


--
-- Name: vaccines vaccine_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines ALTER COLUMN vaccine_id SET DEFAULT nextval('public.vaccines_vaccine_id_seq'::regclass);


--
-- Name: vaccines animal_vaccine_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines ALTER COLUMN animal_vaccine_id SET DEFAULT nextval('public.vaccines_animal_vaccine_id_seq'::regclass);


--
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.animals (animal_id, breed, color, birthday, gender, animal_name, species, animal_customer_id) FROM stdin;
13	British	gray	2022-12-31	female	Tales	Cat	7
14	Chincilla	white	2019-12-15	female	Venüs	Cat	4
15	Tekir	brown	2023-01-15	male	Hamsi	Cat	8
16	Persian	Yellow	2020-01-15	male	Şans	Cat	6
18	Persian	white	2013-03-10	male	Paşa	Cat	9
\.


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (appointment_id, appointment_date, appointment_animal_id, appointment_doctor_id) FROM stdin;
5	2024-01-07 10:00:00	13	7
6	2024-01-31 10:00:00	14	2
7	2024-01-31 14:00:00	15	3
8	2024-01-31 14:00:00	16	6
9	2024-01-31 16:00:00	15	6
10	2024-01-04 16:00:00	18	8
\.


--
-- Data for Name: available_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.available_dates (av_date_id, av_date, availabledate_doctor_id) FROM stdin;
4	2024-01-07	7
5	2024-01-08	7
6	2024-01-12	7
7	2024-01-25	7
8	2024-01-31	7
9	2024-01-31	2
10	2024-01-31	3
11	2024-01-31	6
12	2024-01-18	6
13	2024-01-15	6
14	2024-01-20	6
15	2024-01-12	6
16	2024-01-12	8
17	2024-01-21	8
18	2024-01-20	8
19	2024-01-04	8
20	2024-01-30	8
21	2024-01-16	8
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, customer_address, customer_city, customer_mail, customer_name, customer_phone) FROM stdin;
6	a mahallesi	ankara	ozlemylmaz@hotmail.com	Özlem Yılmaz	048534
8	y mahallesi	istanbul	yusufmete@hotmail.com	Yusuf Mete	3215468
9	c mahallesi	istanbul	cansunat@hotmail.com	Cansu Unat	448687
7	hale mahallesi	istanbul	hale@hotmail.com	Hale Coşar	01234
4	hale mahallesi	istanbul	omer@hotmail.com	Omer Coşar	014634
\.


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (doctor_id, doctor_address, doctor_city, doctor_mail, doctor_name, doctor_phone) FROM stdin;
2	kadıköy	istanbul	ayse@ayse.com	Ayşe	4466
3	kartal	istanbul	ayelif@elif.com	Elif	4684865
6	Bostancı	istanbul	ali@ali.com	Ali	456486
8	Kartal	istanbul	özge@özge.com	Özge	45454678
7	Pendik	istanbul	ahmet@hotmail.com	Ahmet	2563562
\.


--
-- Data for Name: vaccines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vaccines (vaccine_id, code, vaccine_name, finish_date, start_date, animal_vaccine_id) FROM stdin;
7	2	İç Parazit	2024-12-10	2023-10-10	13
8	2	İç Parazit	2024-07-05	2023-05-05	14
9	2	İç Parazit	2024-05-03	2023-03-03	15
10	2	İç Parazit	2024-02-10	2023-12-10	16
11	2	İç Parazit	2024-01-08	2023-11-08	18
12	3	Dış Parazit	2024-01-08	2023-11-08	13
13	3	Dış Parazit	2023-12-08	2023-10-08	14
14	3	Dış Parazit	2023-08-08	2023-06-08	15
15	3	Dış Parazit	2023-09-16	2023-07-16	16
16	3	Dış Parazit	2023-02-16	2023-12-16	18
6	1	Kuduz	2023-12-23	2023-10-23	18
25	1	Karma	2024-03-12	2024-01-08	18
26	1	Karma	2024-03-12	2024-01-08	13
27	1	Karma	2024-03-12	2024-01-08	14
28	1	Karma	2024-02-08	2024-01-01	15
29	1	Karma	2024-02-06	2024-01-05	16
\.


--
-- Name: animals_animal_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animals_animal_customer_id_seq', 1, false);


--
-- Name: animals_animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.animals_animal_id_seq', 18, true);


--
-- Name: appointments_appointment_animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_animal_id_seq', 1, false);


--
-- Name: appointments_appointment_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_doctor_id_seq', 1, false);


--
-- Name: appointments_appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointments_appointment_id_seq', 10, true);


--
-- Name: available_dates_av_date_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.available_dates_av_date_id_seq', 21, true);


--
-- Name: available_dates_availabledate_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.available_dates_availabledate_doctor_id_seq', 1, false);


--
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 9, true);


--
-- Name: doctors_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_doctor_id_seq', 8, true);


--
-- Name: vaccines_animal_vaccine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccines_animal_vaccine_id_seq', 1, false);


--
-- Name: vaccines_vaccine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vaccines_vaccine_id_seq', 29, true);


--
-- Name: animals animals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_pkey PRIMARY KEY (animal_id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id);


--
-- Name: available_dates available_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.available_dates
    ADD CONSTRAINT available_dates_pkey PRIMARY KEY (av_date_id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);


--
-- Name: vaccines vaccines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines
    ADD CONSTRAINT vaccines_pkey PRIMARY KEY (vaccine_id);


--
-- Name: appointments fk27d0xcbajwaeeun2doojsae4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fk27d0xcbajwaeeun2doojsae4 FOREIGN KEY (appointment_doctor_id) REFERENCES public.doctors(doctor_id);


--
-- Name: vaccines fkbm5sojmy5xi6b91bxh71tb9h0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vaccines
    ADD CONSTRAINT fkbm5sojmy5xi6b91bxh71tb9h0 FOREIGN KEY (animal_vaccine_id) REFERENCES public.animals(animal_id);


--
-- Name: animals fknjsvd8kplxqmf48ybxayrx6ru; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT fknjsvd8kplxqmf48ybxayrx6ru FOREIGN KEY (animal_customer_id) REFERENCES public.customers(customer_id);


--
-- Name: appointments fko4t945rb708af9ry6syof7bwt; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT fko4t945rb708af9ry6syof7bwt FOREIGN KEY (appointment_animal_id) REFERENCES public.animals(animal_id);


--
-- Name: available_dates fkrqb0ca2euhxjlmbkd4i3ncxfg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.available_dates
    ADD CONSTRAINT fkrqb0ca2euhxjlmbkd4i3ncxfg FOREIGN KEY (availabledate_doctor_id) REFERENCES public.doctors(doctor_id);


--
-- PostgreSQL database dump complete
--

