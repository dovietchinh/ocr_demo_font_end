import classNames from 'classnames/bind'
import { useState } from 'react'
import { Button, ToggleButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { mode, training } from '~/myredux'
import styles from './CreateLabels.module.scss'
let cx = classNames.bind(styles)


const labelOptions = {
    'Characters':{
        'options':['Numbers','Letters','Both','All'],
        'haveInput': true,
    },
    'Name':{
        'options': ['VN','Foreign alphabet'],
        'haveInput': false,
    },
    'Sex':{
        'options': ['VN','VN English 1','VN English 2','English 1','English 2'],
        'haveInput': true,
    },
    'Time':{
        'options': ['Full slash','Full dash','Full English 1','Full English 2','Full American English 1',
                    'Full American English 2','Month - Year slash', 'Month - Year dash',
                    'Month - Year English', 'Period full', 'Period full English', 'Period full American English',
                    'Period month year', 'Period month year English', 'Period year', 'Date', 'Month', 'Month English',
                    'Month English short', 'Year', 'Special'],
        'haveInput': false,
    },
    'Place':{
        'options': ['Full','Brief','City','Nationality','Organization'],
        'haveInput': false,
    },
    'Job':{
        'options': ['Full','Brief'],
        'haveInput': true,
    },
    'Specialize':{
        'options': ['VN'],
        'haveInput': false,
    },
    'Business':{
        'options': ['VN'],
        'haveInput': false,
    },
    'Ethnic':{
        'options': ['VN'],
        'haveInput': false,
    },
    'Religion':{
        'options': ['VN'],
        'haveInput': false,
    },
    'Identifying characteristics':{
        'options': ['VN'],
        'haveInput': false,
    },
    'Others':{
        'options': [null],
        'haveInput': true,
    },
}

const extraOptions = {
    'Font family':['Times New Roman1','Times New Roman2',''],
    'Font size': ['default','1','3','5','7','9','11','13','15','17','19','21','23','25','27','29','31','33','35','37','39'],
    'Font type': ['regular','bold','italic','bold italic'],
    'Font color': ['black','white','red'],
    'Font align': ['left','center','right',],
    'Font capitalize': ['default','lower','upper','capitalize']
}

function CreateLabels({}){
    const dispatch = useDispatch()
    const createLabelMode = useSelector(state=>state.mode.createLabelMode)
    const [selectType,setSelectTtype] = useState('Image')
    const [labelName,setLabelName] = useState('')
    const [optionState,setOptionState] = useState({})
    const [selectLevel2,setSelectLevel2] = useState(0)
    // const [optionLevel3,setOptionLevel2] = useState()
    return (
        <div className={cx("Modal")}>
            <div className={cx("container")}>
                <div className={cx("title")}><span>Create label</span></div>
                <div className={cx("body")}>
                    <div className={cx("form")}>
                        <div className={cx("form-group--label")}>
                            <label>Label name</label>
                            <input placeholder='enter your label name'
                                    type='text'
                                    value={labelName}
                                    onChange={e=>setLabelName(e.target.value)}
                            />
                        </div>
                        <div className={cx("form-group--select")}>
                            <span>Select type</span>
                            <div className={cx("form-group--select__radio")}>
                                <div className={cx("select--items")}>
                                    <input type='radio'
                                    value="Image"
                                    checked={selectType=="Image"}
                                    onChange={e=>{setSelectTtype(e.target.value)}} 
                                    name='select--type'>
                                    
                                    </input>
                                    <label>Image</label>
                                </div>
                                <div className={cx("select--items")}>
                                    <input type='radio'
                                    value="Text"
                                    onChange={e=>{setSelectTtype(e.target.value)}}  
                                    name='select--type'></input>
                                    <label>Text</label>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {
                    selectType=='Image' && (
                        <div className={cx("expand__content")}>
                            <div className={cx("expand__content--row")}>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio"
                                     name="image--info"></input>
                                    <label>Portrait</label>
                                </div>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio" name="image--info"></input>
                                    <label>Handprints</label>
                                </div>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio" name="image--info"></input>
                                    <label>QR code</label>
                                </div>
                            </div>
                            <div className={cx("expand__content--row")}>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio" name="image--info"></input>
                                    <label>Barcode_with character</label>
                                </div>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio" name="image--info"></input>
                                    <label>Barcode_without character</label>
                                </div>
                                <div className={cx("expand__content__radio--items")}>
                                    <input type="radio" name="image--info"></input>
                                    <label>Other</label>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    ) 
                    || (
                        <>
                        <div className={cx("expand2__content")}>
                            <div className={cx("expand2__content__left")}>
                                {
                                    Object.keys(labelOptions).map((key,index)=>{
                                        let cls = ""
                                        if (index==selectLevel2){ cls="btn-level2--active"}
                                        return (
                                            <button key={"expand2__content__left__"+index}
                                                    className={cx("btn--level2",cls)}
                                                    onClick={e=>setSelectLevel2(index)}
                                                >
                                                <span>{key}</span>
                                            </button>
                                        )

                                    })
                                }
                            </div>
                            <div className={cx("expand2__content__right")}>
                                <div className={cx("expand2__content__right--select")}>
                                {
                                    labelOptions[Object.keys(labelOptions)[selectLevel2]].options.map((ele,index)=>{
                                        if(selectLevel2==11){
                                            return(
                                                <div className={cx("other--input")}>
                                                    <input type='text'
                                                        placeholder="Enter description text"
                                                    ></input>
                                                   
                                                </div>
                                            )
                                        }
                                        return(
                                            
                                            <div key={"expand2__content__right__inner__"+index}
                                            className={cx("expand2__content__right__inner")}>
                                                <input type='checkbox'
                                                    value={ele}
                                                    // checked={true}
                                                    onChange={(e)=>{
                                                        console.log(e.target.value)
                                                        console.log(e.target.checked)
                                                        
                                                    }}
                                                ></input>
                                                <span>{ele}</span>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                        <div className={cx("select--option")}> 
                        {
                            Object.keys(extraOptions).map((key,index)=>{
                                let values = extraOptions[key]
                                return(
                                    <div className={cx("select--option--items")} key={"select--option--items_"+index}>
                                        <label>{key}</label>
                                        <div>
                                            <select
                                                onChange={e=>{
                                                }}>
                                                {
                                                    values.map((value)=>{
                                                        return(<option value={value}>{value}</option>)
                                                    })
                                                }
                                            </select>
                                        </div> 
                                    </div>
                                )
                            })
                        }

                        </div>
                        </>
                    )
                    }
                    <div className={cx("actions")}>
                        <Button variant='light' onClick={e=>{
                            dispatch(mode.actions.actionSetCreateLabelMode(false))
                        }}>Cancel</Button>
                        <Button variant='primary' onClick={(e)=>{
                            dispatch(training.actions.actionAddListLabels(labelName))
                            dispatch(mode.actions.actionSetCreateLabelMode(false))
                        }}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default CreateLabels