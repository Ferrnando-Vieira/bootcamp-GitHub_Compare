import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 260px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      display: flex;
      align-items: flex-end;
    }

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #e6e6e6;
      }
    }

    button {
      display: flex;
      margin: 10px 20px;
      text-align: center;
      align-items: center;
      justify-items: center;
      color: #fff;
      border: 0;
      font-size: 16px;
      font-weight: bold;
      border-radius: 3px;

      &:hover {
        cursor: pointer;
      }
    }

    button#remove {
      padding: 5px 80px;
      background: #f01426;

      &:hover {
        background: #c50d2b;
      }
    }

    button#refresh {
      padding: 5px 75px;
      background: #0fa5c7;

      &:hover {
        background: #1c98ba;
      }
    }
  }
`;
