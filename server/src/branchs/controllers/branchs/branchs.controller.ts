/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BranchsService } from 'src/branchs/services/branchs/branchs.service';
import { CreateBranchsDto } from 'src/dto/create/create-branchs.dto';

@Controller('branchs')
export class BranchsController {

    constructor(private branchService: BranchsService) {}

    @Post()
    public create(@Body() branch: CreateBranchsDto) {
        try {
            return this.branchService.create(branch);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    @Get()
    public async findAll(): Promise<any> {
        try {
            return await this.branchService.findAll();
        } catch (error) {
            throw error;
        }
    }
    
}
