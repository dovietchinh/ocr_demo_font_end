import classNames from 'classnames/bind'
import { useState } from 'react'
import { Button, ToggleButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { mode, training } from '~/myredux'
import styles from './CreateLabels.module.scss'
let cx = classNames.bind(styles)


const labelOptions = {
    'Characters':{
        'options':['X_numbers','X_letters','X_both','X_all'],
        'haveInput': true,
    },
    'Name':{
        'options': ['Vn','Foreign_alphabet'],
        'haveInput': false,
    },
    'Sex':{
        'options': ['Vn','Vn_English_1','Vn_English_2','English_1','English_2'],
        'haveInput': false,
    },
    'Time':{
        'options': ['Full_slash','Full_dash','Full_English','Full_English_2','Full_American_English',
                    'Full_American_English_2','Month_year_slash', 'Month_year_dash',
                    'Month_year_English', 'Period_full', 'Period_full_English', 'Period_full_American_English',
                    'Period_month_year', 'Period_month_year_English', 'Period_year', 'Date', 'Month', 'Month_English',
                    'Month_English_short', 'Year', 'Special'],
        'haveInput': false,
    },
    'Place':{
        'options': ['Full','Brief','City','Nationality','Organization'],
        'haveInput': false,
    },
    'Job':{
        'options': ['Full','Brief'],
        'haveInput': false,
    },
    'Specialize':{
        'options': ['Vn'],
        'haveInput': false,
    },
    'Business':{
        'options': ['Vn'],
        'haveInput': false,
    },
    'Ethnic':{
        'options': ['Vn'],
        'haveInput': false,
    },
    'Religion':{
        'options': ['Vn'],
        'haveInput': false,
    },
    'Identifying characteristics':{
        'options': ['Vn'],
        'haveInput': false,
    },
    'Others':{
        'options': [null],
        'haveInput': false,
    },
}

const extraOptions = {
    'Font family':['Times New Roman 1','Times New Roman 2','Arial 1','Arial 2','Arial 3'],
    'Font size': ['default','1','3','5','7','9','11','13','15','17','19','21','23','25','27','29','31','33','35','37','39'],
    'Font type': ['regular','bold','italic','bold italic'],
    'Font color': ['black','white','red'],
    'Font align': ['left','center','right',],
    'Font capitalize': ['default','lower','upper','capitalize']
}
const imageOption = ['Portrait',"Handprints","QR_code","Barcode_with_characters", "Barcode_without_characters","Other"]

function CreateLabels({}){
    const dispatch = useDispatch()
    // const createLabelMode = useSelector(state=>state.mode.createLabelMode)
    const [selectType,setSelectTtype] = useState('Image')
    const [labelName,setLabelName] = useState('')
    const [optionState,setOptionState] = useState({
        "field_info":[

        ],
        'additional_info': '',
        "font": [
            "Times New Roman 1"
        ],
        "font_size": [
            "default"
        ],
        "font_type": [
            "regular"
        ],
        "font_color": [
            'black'
        ],
        "font_align": [
            "left"
        ],
        "font_capitalize": [
            "default"
        ]
    })
    const [selectLevel2,setSelectLevel2] = useState(0)
    const [characterLength,SetCharacterLength] = useState('')
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
                                {/* <div className={cx("expand__content__radio--items")}>
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
                                </div> */}
                                {
                                    imageOption.map((ele,index)=>{
                                        return(
                                            <div className={cx("expand__content__radio--items")}
                                                key={"expand__content__radio--items_"+index}>
                                                <input type="radio" name="image--info"
                                                        value={ele}
                                                        onChange={(e)=>{
                                                            setOptionState((prev)=>{
                                                                return{
                                                                    ...prev,
                                                                    'field_info': [["Image",e.target.value,null]]
                                                                }
                                                                
                                                            })
                                                        }}
                                                ></input>
                                                <label>{ele.replaceAll('_'," ")}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
                                                        setOptionState((prev)=>{
                                                            
                                                            return {
                                                                ...prev,
                                                                'field_info':[...prev.field_info,["Text",Object.keys(labelOptions)[selectLevel2],ele]]
                                                            }
                                                        })
                                                    }}
                                                ></input>
                                                <span>{ele.replace("X_","").replaceAll("_"," ")}</span>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                {
                                labelOptions[Object.keys(labelOptions)[selectLevel2]].haveInput && <div className={cx("input__text__length")}>
                                    <span>Length</span>
                                    <div>
                                        <input type="text" placeholder='Enter number of character'
                                            value={optionState.additional_info}
                                            onChange={e=>{
                                                if(/^[0-9]+$/.test(e.target.value) | e.target.value==''){
                                                    setOptionState(prev=>{
                                                    
                                                        return{
                                                            ...prev,
                                                            'additional_info': e.target.value
                                                        }
                                                    }) 
                                                }
                                            
                                            }}
                                        ></input>
                                    </div>

                                </div>
                                }
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
                                                    setOptionState(prev=>{
                                                        return{
                                                            ...prev,
                                                            [key]:[e.target.value]
                                                        }
                                                    })
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
                            dispatch(training.actions.actionsAddFieldInfo({
                                [labelName]: optionState
                            }))
                            dispatch(mode.actions.actionSetCreateLabelMode(false))
                        }}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default CreateLabels