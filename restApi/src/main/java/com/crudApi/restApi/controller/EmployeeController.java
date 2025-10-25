package com.crudApi.restApi.controller;

import com.crudApi.restApi.entity.Employee;
import com.crudApi.restApi.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping("/employee")
    public ResponseEntity<?> postEmployee(@RequestBody Employee employee){
        try {
            return new ResponseEntity<>(employeeService.postEmployee(employee), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/employee")
    public ResponseEntity<?> getEmployee(){
        try{
            return new ResponseEntity<>(employeeService.getEmployees(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeebyId(@PathVariable Long id){
        Optional<Employee> optionalEmployee = employeeService.getEmployeeById(id);
        if(optionalEmployee.isPresent()){
            return new ResponseEntity<>(optionalEmployee, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Id " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployeebyId(@PathVariable Long id){
        Optional<Employee> optionalEmployee = employeeService.getEmployeeById(id);
        if(optionalEmployee.isPresent()){
            employeeService.deleteEmployeeById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Id " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployeebyId(@PathVariable Long id, @RequestBody Employee employee){
        Optional<Employee> optionalEmployee = employeeService.updateEmployee(id, employee);
        if(optionalEmployee.isPresent()){
            return new ResponseEntity<>(optionalEmployee, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Id " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }
}
