import React, {useState} from 'react';
import Button from "../../general/Button";
import styles from 'css/housesetup/SelectFloors.module.css'

const SelectFloors = ({updateForm}) => {

    let [floors, setFloors] = useState(1)
    let [hoverable, setHoverable] = useState(true)

    const updateFloors = (newData) => {
        setFloors(newData)
        updateForm({floors:newData})
    }

    const getDivStyle = () => {
        switch (floors) {
            case 1:
                return {
                    height: '139px',
                    gridTemplateRows: '139px 0px 0px 0px'
                };
            case 2:
                return {
                    height: '240px',
                    gridTemplateRows: '139px 0px 0px 101px'
                };
            case 3:
                return {
                    height: '317px',
                    gridTemplateRows: '139px 0px 77px 101px'
                };
            case 4:
                return {
                    height: '394px',
                    gridTemplateRows: '139px 77px 77px 101px'
                };
            default:
                return {}; // Default style or you can return a style for floors = 0
        }
    };

    const clickFloor = (floors) => {
        updateFloors(floors)
        setHoverable(false)
    }

    const hoverFloor = (floors) => {
        if(hoverable)
            updateFloors(floors)
    }

    return (
        <div className={styles.floorsWrapper}>
            <div></div>
            <div className={styles.floorNumbers}>
                <Button
                    style="solid"
                    active={floors===4}
                    callback={() => clickFloor(4)}
                    hoverCallback={() => hoverFloor(4)}>4+
                </Button>
                <Button
                    style="solid"
                    active={floors===3}
                    callback={() => clickFloor(3)}
                    hoverCallback={() => hoverFloor(3)}>3
                </Button>
                <Button
                    style="solid"
                    active={floors===2}
                    callback={() => clickFloor(2)}
                    hoverCallback={() => hoverFloor(2)}>2</Button>
                <Button
                    style="solid"
                    active={floors===1}
                    callback={() => clickFloor(1)}
                    hoverCallback={() => hoverFloor(1)}>1
                </Button>
            </div>
            <div className={styles.floorsHouse} style={getDivStyle()}>
                <div className={`${styles.houseFloor} ${styles.house4} ${(floors <= 4) ? styles.active : ''}`}>
                    <img src="/housesetup/top-floor.png"/>
                </div>
                <div className={`${styles.houseFloor} ${styles.house3} ${(floors <= 3) ? styles.active : ''}`}>
                    <img src="/housesetup/middle-floor.png"/>
                </div>
                <div className={`${styles.houseFloor} ${styles.house2} ${(floors <= 2) ? styles.active : ''}`}>
                    <img src="/housesetup/middle-floor.png"/>
                </div>
                <div className={`${styles.houseFloor} ${styles.house1} ${(floors <= 1) ? styles.active : ''}`}>
                    <img src="/housesetup/bottom-floor.png"/>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default SelectFloors;