import {LabelStub} from "../../label/entities/label-stub";
import {Todo} from "../../../../src/domain/todo/entities/todo";

export const TodoStub = { id: '0001', message: 'Message', label: LabelStub, dueDate: new Date() } as Todo
