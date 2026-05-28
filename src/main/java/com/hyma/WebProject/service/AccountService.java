package com.hyma.WebProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hyma.WebProject.model.Account;
import com.hyma.WebProject.repository.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account registerNewAccount(Account account) {
        if (accountRepository.existsByEmail(account.getEmail())) {
            throw new RuntimeException("An account with this email already exists!");
        }
        return accountRepository.save(account);
    }
}