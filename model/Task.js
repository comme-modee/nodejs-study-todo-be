//Task에 관련된 데이터베이스 스키마 저장소

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

//mongoose의 model을 만들어주는 기능을 이용해
//Task라는 모델을 taskSchema라는 스키마를 거쳐서 만든다.
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;