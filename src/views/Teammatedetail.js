import React, { useEffect, useState } from 'react'; // import 로 useState 를 불러온다!
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom'
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Link } from '@material-ui/core';
import UpdateTeam from './Teamboard/updateTeam';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 400,
    },
    contest_main: {
      padding: '30px',
    },
    contain_div: {
      marginTop: 30,
      background: 'gray',
      borderRadius: 20
    },
    imgtest: {
      height: 300,
      margin: 20
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      padding:20
    },
    boardinfo: {
      fontWeight: 'bold'
    },
    list: {
      fontWeight: 'bold',
      fontSize: 20
    },
    button_div: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 30
    },
    btn: {
      height: 75,
      width: 200,
      fontSize: 30
    },
    divider: {
      color: "black",
      marginTop: 30,
      marginLeft: 30
    },
    reply: {
      border: "1px solid",
      marginTop: 10,
    },
    reply_content: {
      marginTop: 10
    },
    avar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    updateDeleteBtn: {
      float: 'right'
    },
    menuButtonHidden: {
      display: 'none',
    },

}));

export default function Teammatedetail({ match }) {
    const classes = useStyles();
    const [section, setsection] = useState([]);
    const [section2, setsection2] = useState([]);
    const [IsModify, setIsModify] = useState(false);

    const userInfo = localStorage.user;
    const history = useHistory();

    useEffect(() => {
      axios.get('http://localhost:3001/team/detail/' + match.params.TB_code, {//공모전 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection(response.data[0]);
      })
    }, []);

    useEffect(() => {
      axios.get('http://localhost:3001/team/reply/' + match.params.TB_code, {//공모전 데이터 들고오기
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.data);
        setsection2(response.data);
      })
    }, []);

    // 작성자인지 확인
    const IsWriter = (userCode) => {
      if(userInfo === undefined || JSON.parse(userInfo).User_code !== userCode) { return false;}
      else { return true; }
      }

    //삭제
    async function onClickDelete() {
      if(window.confirm("게시글을 삭제하시겠습니까?")){
        await axios.post('http://localhost:3001/teamboard/delete/' + section.TB_code, 
        {
          TB_code: section.TB_code
        }).then( res => {
          console.log("res:",res.data);
          history.push('/teammate');
        })
      }
      else{
          console.log("canceled");
       }
     }

     const onClickUpdate = () =>{
       setIsModify(true);
     }



  
    return (
      <React.Fragment>
        {IsModify ? <UpdateTeam TBinfo={section}/> : 
        <main>
          <Container maxWidth="lg">
            <h3>팀원모집 게시판</h3>
            <Divider/>
            <div className={classes.contain_div}>
              <div className={classes.title}>제목: {section.TB_title}</div>
              <nav className={classes.updateDeleteBtn}>
                <Button variant="contained" color="grey" onClick={onClickDelete} className={clsx(!IsWriter(section.User_code) && classes.menuButtonHidden)}>삭제</Button>
                
                <Button variant="contained" color="grey" onClick={onClickUpdate} className={clsx(!IsWriter(section.User_code) && classes.menuButtonHidden)}>수정</Button>
                
              </nav>
              <Divider/>
              <Grid container>
                <Grid item xs={4} className={classes.boardinfo}>작성자: </Grid>
                <Grid item xs={4} className={classes.boardinfo}>작성일: {section.TB_createDate}</Grid>
                <Grid item xs={2} className={classes.boardinfo}>조회수: </Grid>
                <Grid item xs={2} className={classes.boardinfo}>댓글: </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <img className={classes.imgtest} src="https://source.unsplash.com/collection/1"></img>
                </Grid>
                <Grid item xs={6}>
                  <List>
                    <ListItem className={classes.list}>종류: {section.TB_contestOrProject}</ListItem>
                    <ListItem className={classes.list}>카테고리: {section.CT_code}</ListItem>
                    <ListItem className={classes.list}>모집기간: {section.TB_createDate} / {section.TB_finalDate}</ListItem>
                    <ListItem className={classes.list}>공모전링크: </ListItem>
                    <ListItem className={classes.list}>게시판링크: </ListItem>
                    <ListItem className={classes.list}>팀원현황: {section.TB_recruitNumber} / {section.TB_finalNumber}</ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid container>
                <Grid className={classes.button_div} item xs={6}>
                  <Button className={classes.btn} variant="contained" color="secondary">
                    쪽지보내기
                  </Button>
                </Grid>
                <Grid className={classes.button_div} item xs={6}>
                  <Button className={classes.btn} variant="contained" color="primary">
                    가입하기
                  </Button>
                </Grid>
              </Grid>
              <Container>
                <div dangerouslySetInnerHTML={{__html: section.TB_content} }></div>
              </Container>
              <Divider className={classes.divider} />
              {section2.map((section) => (
                <Container className={classes.reply}>
                  <Grid container>
                    <Grid item xs={0.5}>
                      <Avatar className={classes.avar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid item xs={1}>
                      {section.TBR_writer}
                    </Grid>
                    <Grid item xs={2}>
                      {section.TBR_createDate}
                    </Grid>
                  </Grid>
                  <Container className={classes.reply_content}>
                    {section.TBR_content}
                  </Container>
                </Container>
              ))}
            </div>
          </Container>
        </main>
        }
      </React.Fragment>
    );
  }