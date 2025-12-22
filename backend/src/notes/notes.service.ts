import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    const note = this.notesRepository.create({
      ...createNoteDto,
      userId,
    });

    return this.notesRepository.save(note);
  }

  async findAll(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id, userId },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<Note> {
    const note = await this.findOne(id, userId);
    
    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async remove(id: number, userId: number): Promise<void> {
    const note = await this.findOne(id, userId);
    await this.notesRepository.remove(note);
  }

  async archive(id: number, userId: number): Promise<Note> {
    const note = await this.findOne(id, userId);
    note.isArchived = true;
    return this.notesRepository.save(note);
  }

  async unarchive(id: number, userId: number): Promise<Note> {
    const note = await this.findOne(id, userId);
    note.isArchived = false;
    return this.notesRepository.save(note);
  }
}
