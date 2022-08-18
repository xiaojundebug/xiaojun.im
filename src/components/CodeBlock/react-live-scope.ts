import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const reactScope = {
  React,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
}

export const scope = {
  ...reactScope,
}
