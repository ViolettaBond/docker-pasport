import os
import random
import psycopg2
from faker import Faker

fake = Faker('ru_RU')

try:
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "postgres"),
        database=os.getenv("DB_NAME", "requests"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "postgres")
    )
    cursor = conn.cursor()

    print("Подключение к базе данных успешно. Начинаем заполнение...")

    for _ in range(1000):
        gender = random.choice(['Мужской', 'Женский'])

        if gender == 'Мужской':
            full_name = fake.name_male()
        else:
            full_name = fake.name_female()
 
        mobile_phone = fake.phone_number()
        home_phone = fake.phone_number()  
        other_contact = fake.text(max_nb_chars=50) 
        email = fake.ascii_free_email()  
        cursor.execute(
            """
            INSERT INTO requests 
            (full_name, mobile_phone, home_phone, other_contact, email, gender) 
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (full_name, mobile_phone, home_phone, other_contact, email, gender)
        )

    conn.commit()
    cursor.close()
    conn.close()
    print("Успешно сгенерировано и добавлено 1000 записей!")

except Exception as e:
    print(f"Ошибка при заполнении данных: {e}")
