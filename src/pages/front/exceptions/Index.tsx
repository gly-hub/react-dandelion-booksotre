import { Button, Result } from 'antd';
import { ResultProps } from 'antd/es/result';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const ExceptionIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const newResultProps = useMemo(() => {
    const onBackClick: React.MouseEventHandler<HTMLElement> = (e) => {
      e.stopPropagation();
      navigate('/index');
    };
    const getPageInformation = (pathname: string) => {
      const pageInformation: Record<string, ResultProps> = {
        '/403': {
          status: 403,
          title: 403,
          subTitle: '对不起，您无权访问此页面。',
          extra: (
            <Button type="primary" onClick={onBackClick}>
              回到首页
            </Button>
          ),
        },
        '/404': {
          status: 404,
          title: 404,
          subTitle: '对不起，页面不存在。',
          extra: (
            <Button type="primary" onClick={onBackClick}>
              回到首页
            </Button>
          ),
        },
        '/500': {
          status: 500,
          title: 500,
          subTitle: '对不起，服务器出了点问题。',
          extra: (
            <Button type="primary" onClick={onBackClick}>
              回到首页
            </Button>
          ),
        },
      };
      if (pageInformation[pathname]) {
        return pageInformation[pathname];
      }
      return pageInformation['404'];
    };
    return getPageInformation(location.pathname);
  }, [location.pathname, navigate]);
  return <Result {...newResultProps} />;
};

export default ExceptionIndex;
