import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import WarningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css'

const TeacherForm = () => {
    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0,from: '',to: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '',to: ''}
        ]);
    }

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro efetuado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Error no cadastro: ');
        });

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });
    }
    
    function addNewScheduleValue(position: number, field: string, value:string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        setScheduleItems(updateScheduleItems);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher esse formulário de inscrição" />

        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>
                    <Input type="text" name="name" label="Nome completo" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <Input type="text" name="avatar" label="Avatar"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)} />
                    <Input type="text" name="whatsapp" label="Whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)} />
                    <Textarea name="bio" label="Biografia"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)} />
                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>
                    <Select name="subject" label="Máteria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            {value: 'Artes', label:'Artes'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Ciências', label:'Ciências'},
                            {value: 'Educação física', label:'Educação física'},
                            {value: 'Física', label:'Física'},
                            {value: 'Geografia', label:'Geografia'},
                            {value: 'História', label:'História'},
                            {value: 'Matemática', label:'Matemática'},
                            {value: 'Português', label:'Português'},
                            {value: 'Química', label:'Química'},
                            {value: 'ingles', label:'Inglês'}
                        ]} />
                    <Input type="text" name="cost" label="Custo da sua hora por aula (em R$)"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)} />
                </fieldset>
                <fieldset>
                    <legend>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                    </legend>
                    {
                        scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select name="week_day"
                                        label="Dia da semana"
                                        onChange={e => addNewScheduleValue(index, 'week_day', e.target.value)}
                                        value={scheduleItem.week_day}
                                        options={[
                                            {value: '0', label:'Domingo'},
                                            {value: '1', label:'Segunda-feira'},
                                            {value: '2', label:'Terça-feira'},
                                            {value: '3', label:'Quarta-feira'},
                                            {value: '4', label:'Quinta-feira'},
                                            {value: '5', label:'Sexta-feira'},
                                            {value: '6', label:'Sábado'}
                                    ]} />
                                    <Input
                                        type="time"
                                        name="from"
                                        label="Das"
                                        value={scheduleItem.from}
                                        onChange={e => addNewScheduleValue(index, 'from', e.target.value)} />
                                    <Input 
                                        type="time"
                                        name="to"
                                        label="Até"
                                        value={scheduleItem.to}
                                        onChange={e => addNewScheduleValue(index, 'to', e.target.value)} />
                                </div>
                            );
                        })
                    }

                </fieldset>
                <footer>
                    <p>
                        <img src={WarningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </form>
        </main>
        </div>

    )
}

export default TeacherForm;