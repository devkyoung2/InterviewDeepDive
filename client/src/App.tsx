import { useEffect, useState } from 'react';

import timer from './Timer';
import api from './axios';

type TQuestion = {
  question: string;
  category: string;
};

const App = () => {
  const [question, setQuestion] = useState<string>('버튼을 눌러 시작하세요');
  const [btnText, setBtnText] = useState<'시작하기' | '다른문제'>('시작하기');
  const [history, setHistory] = useState<string[]>([]);
  const {
    handleInputChange,
    handleStart,
    inputMinutes,
    inputSeconds,
    isRunning,
  } = timer();

  const selectQuestion = async () => {
    if (inputMinutes.length + inputSeconds.length === 0) {
      alert('시간을 입력해주세요!');
      return;
    }

    try {
      const { data } = await api.get<TQuestion>('/random-question');
      const newQuestion = data.question;
      if (btnText === '시작하기') {
        handleStart();
        setBtnText('다른문제');
      }
      setHistory([...history, newQuestion]);
      setQuestion(newQuestion);
    } catch (error) {
      console.error('질문을 가져오는 중 오류 발생:', error);
    }
  };

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  };

  useEffect(disableScroll, []);

  return (
    <div className='h-screen w-full bg-emerald-700 text-center p-10 md:py-20 flex flex-col'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-md font-PartialSansKR pb-11'>
        면접질문뽑기
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2 lg:gap-8 lg:h-full md:px-20 2xl:px-40 font-GoormSansBold '>
        <div className='bg-white rounded-xl px-4 py-6 relative flex flex-col justify-between items-center h-[220px] lg:h-auto'>
          <div className='grow flex items-center justify-center text-2xl sm:text-3xl lg:px-10 xl:text-4xl'>
            {question}
          </div>
          <button
            type='button'
            className='w-56 sm:w-80 xl:w-96 2xl:w-[400px] rounded-full shadow-md bg-emerald-300 h-10 2xl:h-14 text-base sm:text-xl text-white'
            onClick={selectQuestion}
          >
            {btnText}
          </button>
        </div>
        <div className='lg:flex lg:flex-col'>
          <div className='flex flex-col items-center bg-emerald-100 rounded-xl p-4 h-[150px] text-sm grow'>
            <p className='xl:text-xl'>📒 기록 📒</p>
            <div className='w-full h-[100px] lg:grow overflow-y-auto bg-white m-1 lg:m-3 rounded-md'>
              <ul className='px-3 w-full flex flex-col items-start lg:justify-start text-xs xl:text-sm pt-3'>
                {history.map((item, index) => (
                  <li key={index} className='mb-1 text-start line-clamp-1'>
                    🔹{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col items-center bg-emerald-100 rounded-xl p-4 h-[130px] xl:h-[160px] text-sm mt-2 '>
            <p className='xl:text-xl'>⏰ 타이머 ⏰</p>
            <div className='flex grow items-center lg:text-xl'>
              <input
                type='number'
                value={inputMinutes}
                onChange={(e) => handleInputChange(e, 'minutes')}
                className='w-16 h-10 lg:h-16 xl:h-20 text-center bg-white m-1 px-3 rounded-md'
                placeholder='분'
                disabled={isRunning}
              />
              <span className='text-2xl'>:</span>
              <input
                type='number'
                value={inputSeconds}
                onChange={(e) => handleInputChange(e, 'seconds')}
                className='w-16 h-10 lg:h-16 xl:h-20 text-center  bg-white m-1 px-3 rounded-md'
                placeholder='초'
                disabled={isRunning}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
