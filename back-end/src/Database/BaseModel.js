import Joi from '@hapi/joi'
import fs from 'fs'
import path from 'path'
import FileNotFound from '../Errors/FileNotFound'
import IdAlreadyUsed from './Errors/IdAlreadyUsed'
import InvalidSchemeError from './Errors/InvalidScheme'

/**
 * @class
 * @template T
 */
export default class BaseModel {

    /**
     * @param {string} name 
     * @param { Joi.ObjectSchema<any> } model 
     */
    constructor(name, model) {
        this.name = name
        this.filename = path.resolve(`Database/${name}.dbb.json`)
        console.log(this.name)
        console.log(this.filename)
        this.model = model
        this.content = []

        if(!fs.existsSync(this.filename))
            fs.writeFileSync(this.filename, '[]')
    }

    /**
     * @param {T} obj 
     */
    add(obj) {
        this.load()
        if(!obj.id) obj.id = this.content.map(o => o.id).reduce((pv,cv) => pv > cv ? pv : cv, 0) + 1

        const result = this.model.validate(obj)
        if(result.error) throw new InvalidSchemeError(result.error)


        console.log(this.content.find(d => parseInt(d.id) === parseInt(result.value.id)))

        if(this.content.find(d => d.id === result.value.id)) throw new IdAlreadyUsed();

        console.log("bonjour")
        this.content.push(result.value)
        this.save()
    }

    /**
     * @param {T} obj 
     */
    update(obj) {
        this.load()
        const result = this.model.validate(obj)
        if(result.error) throw new InvalidSchemeError(result.error)
        
        const i = this.content.findIndex(o => parseInt(o.id) === parseInt(obj.id))

        if(i === -1) throw new FileNotFound();

        this.content[i] = obj
        this.save()
    }


    delete(objId) {
        this.load()
        const i = this.content.findIndex(p => p.id === objId)
        if(i === -1) throw new FileNotFound();

        this.content = this.content.filter(o => o.id !== objId)
        this.save()
    }

    /**
     * @param {(any) => boolean} predicate 
     */
    deleteAll(predicate) {
        this.load()
        this.content = this.content.filter(o => !predicate(o))
        this.save()
    }

    /**
     * @param {(any) => boolean} predicate
     * @returns {T}
     */
    getOne(predicate) {
        this.load()
        return this.content.find(predicate)
    }

    /**
     * @param {(any) => boolean} predicate 
     * @returns {T}
     */
    getAll(predicate) {
        this.load()
        return this.content.filter(predicate)
    }



    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.content))
    }

    load() {
        const json = fs.readFileSync(this.filename)
        this.content = JSON.parse(json)
    }



}
