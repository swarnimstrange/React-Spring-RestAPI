package com.crudApi.restApi.service;

import com.crudApi.restApi.entity.Employee;
import com.crudApi.restApi.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getEmployees(){
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id){
        return employeeRepository.findById(id);
    }

    public void deleteEmployeeById(Long id){
        employeeRepository.deleteById(id);
    }

    public Optional<Employee> updateEmployee(Long id, Employee employee){
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isPresent()){
            optionalEmployee.get().setName(employee.getName());
            optionalEmployee.get().setDepartment(employee.getDepartment());
            optionalEmployee.get().setPhone(employee.getPhone());
            optionalEmployee.get().setEmail(employee.getEmail());
            employeeRepository.save(optionalEmployee.get());
        }
        return optionalEmployee;
    }
}
