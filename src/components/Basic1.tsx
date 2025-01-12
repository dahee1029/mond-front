import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";

const Box = styled.div`
  width: 150px;
  height: 150px;
  background-color: beige;
`;

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

//부모가 리렌더링되면 자식도 리렌더링 됨
//App => Child1 => ChildChild1=>단방향 아키텍쳐 (flux 패턴)
function Child1({ name }: { name: number }) {
  useEffect(() => {
    console.log("안녕하시렵니까");
    return () => {
      console.log("빠이하시겠습니다");
    }; //클리어함수 : return 으로 뱉는 함수 //unmount가 될 때만 호출되는 함수
  }, []);
  console.log("자식1");
  return <div>나는 {name}이에요</div>;
}

//state변화가 일어난다 => 함수가 재실행됨
//component의 주기 (라이프사이클)
//mount => 컴포넌트가 처음 불러왔을때
//update => 컴포넌트의 state의 변환이 일어나서 재실행, 부모가 리렌더링 될 때 ,전달받은 prop이 변경될 때
//unmount => component가 unmount 되었을때
function Basic1() {
  const [count, setCount] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const a = 1;

  //const mondFn = () => {}; //새로 만들어짐
  //함수를 dependancy Array안에 넣고싶으면 useCallback을 쓰는 것이 좋음
  const mondFn = useCallback(() => {
    console.log("hi count", count);
  }, [count]); //useCallback => 함수를 memoization
  //count가 변경될 때 마다 다시 memoization됨

  //처음에만 뜨는 거
  useEffect(() => {
    mondFn();
  }, [count, mondFn]); //=>mount 시에만 불림
  //[]: 의존성 배열(dependency Array) 배열안의 값이 바뀔때만 불린다.

  return (
    <>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? "하이" : "빠이"}
        </button>
        {isVisible && <Child1 name={count} />}
        <Box>asd</Box>
        <Button>하이</Button>
      </div>
    </>
  );
}

export default Basic1;
