import { useEffect, useState } from 'react';
import Prayer from './components/Prayer';

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [date, setDate] = useState('');
  const [city, setCity] = useState('Cairo');

  const cities = [
    { name: 'القاهرة', value: 'Cairo' },
    { name: 'الإسكندرية', value: 'Alexandria' },
    { name: 'الجيزة', value: 'Giza' },
    { name: 'المنوفية', value: 'Monufia' },
    { name: 'مطروح', value: 'Matruh' },
    { name: 'البحيرة', value: 'Beheira' },
    { name: 'الدقهلية', value: 'Dakahlia' },
    { name: 'المنيا', value: 'Minya' },
    { name: 'الغربية', value: 'Gharbia' },
    { name: 'الفيوم', value: 'Faiyum' },
    { name: 'قنا', value: 'Qena' },
    { name: 'أسيوط', value: 'Asyut' },
    { name: 'سوهاج', value: 'Sohag' },
    { name: 'إسماعيلية', value: 'Ismailia' },
    { name: 'بني سويف', value: 'Beni Suef' },
    { name: 'القليوبية', value: 'Qalyubia' },
    { name: 'أسوان', value: 'Aswan' },
    { name: 'دمياط', value: 'Damietta' },
    { name: 'السويس', value: 'Suez' },
    { name: 'بورسعيد', value: 'Port Said' },
    { name: 'الوادى الجديد', value: 'New Valley' },
    { name: 'شمال سيناء', value: 'North Sinai' },
    { name: 'جنوب سيناء', value: 'South Sinai' },
    { name: '6 أكتوبر', value: '6th of October' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get prayer times
        const prayerRes = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=EG`
        );
        const prayerData = await prayerRes.json();
        const timings = prayerData.data.timings;
        setPrayerTimes(timings);
        setDate(prayerData.data.date.gregorian.date);


      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [city]);

  const convertTo12HourFormat = (time24) => {
    if (!time24) return '';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="data">
            <h3>التاريخ</h3>
            <h4>{date}</h4>
          </div>
        </div>

        <Prayer
          name="صلاة الفجْر	"
          time={convertTo12HourFormat(prayerTimes.Fajr)}
        />
        <Prayer
          name="صلاة الظّهْر	"
          time={convertTo12HourFormat(prayerTimes.Dhuhr)}
        />
        <Prayer
          name="صلاة العَصر	"
          time={convertTo12HourFormat(prayerTimes.Asr)}
        />
        <Prayer
          name=" صلاة المَغرب	"
          time={convertTo12HourFormat(prayerTimes.Maghrib)}
        />
        <Prayer
          name="صلاة العِشاء	"
          time={convertTo12HourFormat(prayerTimes.Isha)}
        />
      </div>
    </section>
  );
}

export default App;
