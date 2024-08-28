import { useState } from 'react';
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

  return (
    <div className='h-screen w-screen bg-emerald-700 flex flex-col justify-center items-center'>
      <h1 className='h-1/6 font-PartialSansKR text-6xl text-white drop-shadow-md'>
        면접질문뽑기
      </h1>
      <section className='bg-white  text-center h-3/5 w-3/5 rounded-3xl shadow-md fl p-8 font-GoormSansBold whitespace-pre-wrap'>
        <p className='h-4/5 p-7 flex justify-center items-center text-3xl '>
          {question}
        </p>
        <button
          type='button'
          className='w-48 rounded-3xl shadow-md bg-emerald-400 p-5 text-xl text-white'
          onClick={selectQuestion}
        >
          {btnText}
        </button>
      </section>
    </div>
  );
};

export default App;
