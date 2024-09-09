import { useEffect, useState } from 'react';
import JavaScript from '../assets/JavaScript.json';

type TQuestion = {
  [key: string]: {
    question: string;
    sort: string;
  };
};

const App = () => {
  const [question, setQuestion] = useState<string>('버튼을 눌러 시작하세요');
  const [btnText, setBtnText] = useState<'시작하기' | '다른문제'>('시작하기');

  const selectQuestion = () => {
    const MAX = 20;
    const questionNum = Math.ceil(Math.random() * MAX).toString();

    const data = JavaScript as TQuestion;
    setQuestion(data[questionNum].question);
    if (btnText === '시작하기') setBtnText('다른문제');
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

  useEffect(() => disableScroll(), []);

  return (
    <div className='h-screen w-full bg-emerald-700 text-center p-10 md:py-20 flex flex-col'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-md font-PartialSansKR pb-11'>
        면접질문뽑기
      </h1>
      <div className='grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-2 lg:gap-8 lg:h-full md:px-20 2xl:px-40 font-GoormSansBold '>
        <div className='bg-white rounded-xl px-4 py-9 relative flex flex-col justify-between items-center h-[250px] lg:h-auto'>
          <div className='grow flex items-center justify-center text-2xl sm:text-3xl xl:text-4xl'>
            {question}
          </div>
          <button
            type='button'
            className='w-56 sm:w-80 xl:w-96 rounded-full shadow-md bg-emerald-300 h-12 text-base sm:text-xl text-white'
            onClick={selectQuestion}
          >
            {btnText}
          </button>
        </div>
        <div className='flex flex-col lg:min-w-[240px]'>
          <div className='bg-emerald-100 rounded-xl grow p-4 h-[120px]'>
            <p>🖋️기록🖋️</p>
          </div>
          <div className='bg-emerald-100 rounded-xl h-[120px] lg:h-36  mt-2 lg:mt-7 p-4 lg:min-w-[240px]'>
            <p>🖋️타이머🖋️</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
