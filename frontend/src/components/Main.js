import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components/macro";

import { API_URL } from "utils/utils"
import thoughts from "reducers/thoughts"
import SignOut from "./SignOut"

const Main = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const thoughtItems = useSelector((store) => store.thoughts.items)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken])

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            }
        }

        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(thoughts.actions.setItems(data.response))
                    dispatch(thoughts.actions.setError(null))
                } else {
                    dispatch(thoughts.actions.setError(data.response))
                    dispatch(thoughts.actions.setItems([]))
                }
            })
    }, [])
    
    return (
        <MainContainer>
        <StyledTitle>Happy thoughts</StyledTitle>
        <StyledThought>
        {thoughtItems.map(item => {
            return <div key={item._id}>{item.message}</div>
        })}
        <StyledSubTitle>Just close your eyes and listen to your inner happy thoughts...</StyledSubTitle>
        </StyledThought>
        <SignOut />
        </MainContainer>
    )
}

export default Main


const MainContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #E7CFD7;
    height: 100vh;
`

const StyledTitle = styled.h1`
    font-size: 2rem;
    margin-top: 3rem;

    @media screen and (min-width: 1024px) {
        font-size: 2.5rem;
    }
`

const StyledThought = styled.div`
    background: #BAC0D4;
    padding: 1em;
    margin-bottom: 1em; 
    margin-top: 2rem;
    width: 250px;
    height: 100px;
    border: 5px solid #3a4664;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 1px 1px 15px -17px rgba(0,0,0,0); 
    box-shadow: 0px 10px 13px -7px #000000, 1px 1px 15px -17px rgba(0,0,0,0);

    @media screen and (min-width: 1024px) {
        width: 350px;
        height: 150px;
    }
`

const StyledSubTitle = styled.h2`
    font-size: 1.2rem;
    text-align: center;

    @media screen and (min-width: 1024px) {
        font-size: 1.5rem;
    }
`