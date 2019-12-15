import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1380px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }

    a {
      color: #999;
      font-weight: bold;
      text-transform: uppercase;
      margin: 0 20px;
      &:first-child {
        margin-left: 0;
      }

      &:hover {
        color: #000;
      }
    }
    a.selected {
      color: #000;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    text-align: right;
    strong {
      color: #666;
    }
  }

  button {
    background-color: none;
    border: none;
    color: #de3b3b;
  }
`;
